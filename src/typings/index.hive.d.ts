/**
 * Create object interfaces to define record components.
 * Each column in the record can be covered by a corresponding property inside the interface.
 * The record typing can be applied via type cast:
 */
// const selRecord = /** @type {ProductRecord} */ (CmpUtils.getRecordCmpValue(Constants.CmpNames.Products));

interface ProductRecord {
  Key: number;
  Length: number;
  Width: number;
  Area: number;
  DisplayText: string;
  DimensionModelNode: string;
}
