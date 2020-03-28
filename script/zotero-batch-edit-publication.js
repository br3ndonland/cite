/**---------------------------- Zotero batch edits ----------------------------
https://www.zotero.org/support/dev/client_coding/javascript_api#batch_editing
Tools -> Developer -> Run JavaScript
Mendeley (previous reference manager) did a terrible job with article metadata.
One of the issues was that the same journal would sometimes have several titles:
- Nature Reviews Molecular Cell Biology
- Nature reviews. Molecular cell biology
- Nat Rev Mol Cell Biol
This script can replace incorrect titles with correct ones.
**/

const fieldName = "publicationTitle"
const oldValue = "Foo"
const newValue = "Foo2"

const fieldID = Zotero.ItemFields.getID(fieldName)
const s = new Zotero.Search()
s.libraryID = Zotero.Libraries.userLibraryID
s.addCondition(fieldName, "is", oldValue)
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
    item.setField(mappedFieldID ? mappedFieldID : fieldID, newValue)
    await item.save()
  }
})
return `${ids.length} item(s) updated`
