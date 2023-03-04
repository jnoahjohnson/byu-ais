import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  process.env.SUPABASE_URL ?? "",
  process.env.SUPABASE_PRIVATE_KEY ?? ""
);

export const checkIfMember = async (netId: string) => {
  const { data, error } = await supabase
    .from("ais_members")
    .select("*")
    .eq("net_id", netId);

  console.log("data", data, error);

  if (error) {
    return false;
  }

  if (data?.length === 0) {
    return false;
  }

  return true;
};
