// I didn't follow the security pattern suggested in the NextJS documentation but you should:
// https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#using-on-demand-revalidation

export default async function handler(req, res) {
  // e.g., ?url=http://localhost:3000/ssg/pokemon/1
  if (req.query) {
    let {url} = req.query;
    await res.revalidate(url);
  } else if (req.body) {
    for (const url of req.body) {
      await res.revalidate(url);
    }
  }
  res.status(200).json({ revalidate: true });
}
