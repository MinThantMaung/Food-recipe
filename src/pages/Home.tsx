import { Button } from "@/components/ui/button";
import { Form } from "react-router-dom";

function Home() {
  return (
    <div className="container mx-auto">
      <Form action="/logout" method="post">
        <Button type="submit" variant="outline">
          Logout
        </Button>
      </Form>
    </div>
  );
}

export default Home;
