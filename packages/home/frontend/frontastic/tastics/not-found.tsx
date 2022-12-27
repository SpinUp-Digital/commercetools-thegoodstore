export default function NotFound({ type }: { type: string }) {
  return <div className="border border-red-300 text-red-300"> Missing Tastic : {type}</div>;
}
