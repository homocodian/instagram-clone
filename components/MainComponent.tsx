import Stories from "./storiesComponent";

function MainComponent() {
  return (
    <section className="min-h-screen overflow-hidden">
      <main className="max-w-[935px] mx-auto flex flex-1 flex-shrink-0 items-stretch">
        <section className="mt-[30px] flex-1 max-w-[600px] w-full mx-auto">
          <div>
            <Stories />
          </div>
        </section>
      </main>
    </section>
  );
}

export default MainComponent;
