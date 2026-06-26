"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addPortfolioAsset(formData: FormData) {
  const supabase = await createClient();
  
  // We mock the user ID since authentication might be in bypass mode
  // In a real app, we'd get this from supabase.auth.getUser()
  const assetClass = formData.get("asset_class") as string;
  const institutionName = formData.get("institution_name") as string;
  const currentValue = parseFloat(formData.get("current_value") as string);
  const monthlyContribution = parseFloat(formData.get("monthly_contribution") as string) || 0;

  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.warn("No authenticated user. In dev mode this action is simulated.");
      return { success: true, simulated: true };
    }

    const { error } = await supabase.from("portfolios").insert({
      user_id: user.id,
      asset_class: assetClass,
      institution_name: institutionName,
      current_value: currentValue,
      monthly_contribution: monthlyContribution
    });

    if (error) throw error;
    
    revalidatePath("/income");
    return { success: true };
  } catch (error) {
    console.error("Failed to add portfolio asset:", error);
    return { success: false, error: "Failed to save asset" };
  }
}
