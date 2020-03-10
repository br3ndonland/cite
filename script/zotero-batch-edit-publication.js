/**---------------------------- Zotero batch edits ----------------------------
https://www.zotero.org/support/dev/client_coding/javascript_api#batch_editing
Tools -> Developer -> Run JavaScript **/

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
await Zotero.DB.executeTransaction(async function() {
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
