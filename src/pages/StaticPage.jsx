import Breadcrumb from '../components/Breadcrumb';

export default function StaticPage({ title, sections }) {
  return (
    <div className="container-custom py-8 max-w-3xl">
      <Breadcrumb items={[{ label: 'Home', link: '/' }, { label: title }]} />
      <h1 className="text-2xl md:text-3xl font-serif font-bold mt-4 mb-6">{title}</h1>
      <div className="space-y-6">
        {sections.map((s, i) => (
          <div key={i} className="bg-white border border-neutral-200 p-6">
            <h2 className="text-lg font-semibold mb-2">{s.heading}</h2>
            <p className="text-sm text-neutral-600 leading-relaxed">{s.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
