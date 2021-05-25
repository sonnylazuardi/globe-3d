// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_HOST,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);

export default async (req, res) => {
  const { data, error } = await supabase.storage
    .from("globe")
    .download(`public/${req.query.id}.png`);

  if (error) res.status(404).send("not found");

  res.status(200);
  data.arrayBuffer().then((buf) => {
    res.send(Buffer.from(buf));
  });
};
