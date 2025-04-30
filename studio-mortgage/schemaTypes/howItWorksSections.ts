import { defineType } from "sanity";

export default defineType({
  name: "howItWorksSection",
  title: "How This Works Section",
  type: "document",
  fields: [
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "title",
      type: "string",
      title: "Section Title",
    },
    {
      name: "body",
      type: "array",
      title: "Content",
      of: [{ type: "block" }],
    },
  ],
});
