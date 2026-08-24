import { supabase } from "../lib/supabase";

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const { data, error } = await supabase
      .from("contact_messages")
      .insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      alert(error.message);
      return;
    }

    console.log("Saved successfully:", data);
    alert("Your enquiry has been submitted successfully!");

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });

  } catch (error) {
    console.error("Unexpected error:", error);
    alert("Something went wrong. Please try again.");
  }
};