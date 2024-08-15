export default function Dashboard() {
  console.log(import.meta.env.VITE_PUBLIC_API_URL);
  
  return (
    <div>dasborad{import.meta.env.VITE_PUBLIC_API_URL}</div>
  )
}
