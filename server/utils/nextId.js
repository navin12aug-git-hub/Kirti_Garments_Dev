// Computes the next numeric `id` for a collection by finding the current max and adding 1.
// Good enough for an admin-panel-scale app; for high write concurrency, swap for a counters collection.
export async function nextId(Model) {
  const last = await Model.findOne().sort({ id: -1 }).select('id').lean();
  return (last?.id || 0) + 1;
}

export default nextId;
