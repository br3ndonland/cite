/**---------------------------- Zotero batch edits ----------------------------
https://www.zotero.org/support/dev/client_coding/javascript_api#batch_editing
Tools -> Developer -> Run JavaScript
Advanced searches: https://www.zotero.org/support/searching
When I migrated from Mendeley to Zotero, Mendeley inserted awful escaped Greek
characters into the title and abstract:
alpha -> $\backslashalpha{\{}\backslash{\$}{\}}
beta -> $\backslashbeta{\{}\backslash{\$}{\}}
gamma -> $\backslashgamma{\{}\backslash{\$}{\}}
delta -> $\backslashdelta{\{}\backslash{\$}{\}}
kappa -> $\backslashkappa{\{}\backslash{\$}{\}}
**/

const fieldName = "title" // abstract fieldName is abstractNote
// Backslashes normally serve as escape characters, but Mendeley stuck them
// directly into article titles and abstracts, so I need to escape the escapes.
const oldValueStart = "$\\backslash"
const oldValueEnd = "{\\{}\\backslash{\\$}{\\}}"
newValue = ""

const s = new Zotero.Search()
s.libraryID = Zotero.Libraries.userLibraryID
s.addCondition(fieldName, "contains", oldValueStart || oldValueEnd)
s.addCondition("itemType", "is", "journalArticle")
const ids = await s.search()
if (!ids.length) {
  return "No items found"
}
await Zotero.DB.executeTransaction(async () => {
  for (let id of ids) {
    let item = await Zotero.Items.getAsync(id)
    let mappedFieldID = Zotero.ItemFields.getFieldIDFromTypeAndBase(
      item.itemTypeID,
      fieldName
    )
    // TODO: this just deletes the entire field, need to only update part
    // item.setField(mappedFieldID ? mappedFieldID : fieldID, newValue)
    // await item.save()
  }
})
return `${ids.length} item(s) updated`
