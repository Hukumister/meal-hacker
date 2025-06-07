import Avatar from "./avatar";

export default function ProfilePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Профиль пользователя</h1>
      <Avatar />
    </div>
  );
}