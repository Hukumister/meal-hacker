import Image from 'next/image';

export default function Avatar() {
  return (
    <div className="flex items-center gap-4">
      <div className="relative w-16 h-16">
        <Image
          src="/avatar/main.png"
          alt="User Avatar"
          fill
          className="rounded-full border-2 border-gray object-cover"
        />
      </div>
      <div>
        <p className="text-lg font-semibold hover:text-gray-500 transition-colors duration-200">Tom</p>
        <p className="text-sm text-muted-foreground"></p>
      </div>
    </div>
  );
}
