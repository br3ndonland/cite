/**--------------------- Zotero advanced find and replace ---------------------
https://www.zotero.org/support/dev/client_coding/javascript_api#batch_editing
Tools -> Developer -> Run JavaScript
Advanced searches: https://www.zotero.org/support/searching

When I migrated from Mendeley to Zotero, Mendeley inserted awful escaped Greek
characters into the titles and abstracts of articles:
- alpha -> $\backslashalpha{\{}\backslash{\$}{\}}
- beta -> $\backslashbeta{\{}\backslash{\$}{\}}
- gamma -> $\backslashgamma{\{}\backslash{\$}{\}}
- delta -> $\backslashdelta{\{}\backslash{\$}{\}}
- kappa -> $\backslashkappa{\{}\backslash{\$}{\}}

This script will attempt to strip out the extra characters, leaving just the
English spelling of the Greek character.

Backslashes (`\`) normally serve as escape characters, but here they're encoded
directly into article titles and abstracts, so I need to escape the backslashes.

Zotero doesn't appear to allow searching by regex, so I have to search my Zotero
database with literal strings first, then I can replace with JavaScript regex.

There are a couple of quirks with how Zotero is running this code currently:

1. It's not serializing the `items` object properly, so there's no comma after
   the title field
2. Zotero is replacing fields with only one match, but not more than one match,
   despite the fact that I have the global `g` switch in my regex. If there is
   more than one match, Zotero doesn't replace any of the matches.
**/

const escapeStart = "$\\backslash"
const escapeEnd = "{\\{}\\backslash{\\$}{\\}}"
const regex = /(\$\\backslash)(.*)({\\{}\\backslash{\\\$}{\\}})(\w)/g
const replacer = (match, p1, p2, p3, p4, offset, string) => {
  if (/[b-]/i.test(p4)) {
    return `${p2}${p4}`
  } else {
    return `${p2} ${p4}`
  }
}
const s = new Zotero.Search()
s.libraryID = Zotero.Libraries.userLibraryID
s.addCondition("title", "contains", escapeStart || escapeEnd)
s.addCondition("itemType", "is", "journalArticle")
const ids = await s.search()
if (!ids.length) {
  return "No items found"
}
items = new Object()
await Zotero.DB.executeTransaction(async () => {
  for (let id of ids) {
    let item = await Zotero.Items.getAsync(id)
    let titleFieldID = Zotero.ItemFields.getFieldIDFromTypeAndBase(
      item.itemTypeID,
      "title"
    )
    let newTitle = item.getField("title").replace(regex, replacer)
    let newAbstract = item.getField("abstractNote").replace(regex, replacer)
    items[id] = { newTitle, newAbstract }
    // TODO: set each item's title and abstract to newTitle and newAbstract
    // item.setField("title", newValue)
    // item.setField("abstractNote", newAbstract)
    // await item.save()
  }
})
// return `${ids.length} item(s) updated`
return items
