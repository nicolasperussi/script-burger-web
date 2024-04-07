import { Button } from "@/components/ui/button";
import { seed } from "@/lib/seed";

function Dashboard() {
  return (
    <div>
      <Button onClick={() => seed()}>Seed database</Button>
    </div>
  );
}

export default Dashboard;
