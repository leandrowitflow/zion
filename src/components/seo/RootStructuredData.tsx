import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, webSiteSchema } from "@/lib/seo/schemas";

export function RootStructuredData() {
  return <JsonLd data={[organizationSchema(), webSiteSchema()]} />;
}
