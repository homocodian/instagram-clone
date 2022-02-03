import Posts from "./Posts";
import Sidebar from "./sidebar";
import Stories from "./storiesComponent";

function MainComponent() {
  return (
    <main>
      <section className="min-h-screen overflow-y-hidden">
        <div className="relative flex max-w-[600px] lg:max-w-4xl mx-auto">
          <div className="mt-[30px] max-w-[600px]">
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
