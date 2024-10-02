import { PageHeader } from "@/components/page-header";

type Props = {};

export default function Page(props: Props) {
  return (
    <div className="w-full">
      <PageHeader
        title="Hi CCCoach!"
        description="Today is Monday, 22nd January 2027"
      />
    </div>
  );
}
