import SolutionDetailPage from "../solution-detail-page";

export default function Page({ params }: { params: { slug: string } }) {
    // The slug is now directly passed to the detail page component
    return <SolutionDetailPage slug={params.slug} />;
}
