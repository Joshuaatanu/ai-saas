import { Button } from "@/components/ui/button";
import { UserButton, UserProfile } from "@clerk/nextjs";
import Image from "next/image";

export default function DashboardPage() {
  return (
    <div>
      <p>dashboard page (Protected) </p>
      <UserButton afterSignOutUrl="/" />

      <div className="flex items-center justify-center">
        {/* <UserProfile /> */}
      </div>
    </div>
  );
}
