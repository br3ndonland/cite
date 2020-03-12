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

const s = new Zotero.Search()
s.libraryID = Zotero.Libraries.userLibraryID
s.addCondition(fieldName, "contains", oldValueStart || oldValueEnd)
const ids = await s.search()
if (!ids.length) {
  return "No items found"
}

// TODO: so far, this script finds the items, but doesn't yet run the replace.

return `${ids.length} item(s) found`
