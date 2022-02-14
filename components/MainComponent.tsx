import Posts from "./posts/Posts";
import Sidebar from "./sidebar/Sidebar";
import Stories from "./stories/Stories";

function MainComponent() {
  return (
    <main>
      <section className="min-h-screen overflow-y-hidden">
        <div className="relative lg:flex max-w-4xl lg:mx-auto">
          <div className="mt-[30px] max-w-[600px] mx-auto lg:mx-0">
            <Stories />
            <Posts />
          </div>
          <div className="hidden lg:inline-grid">
            <div className="fixed top-[120px] w-[320px] px-8">
              <Sidebar />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default MainComponent;
