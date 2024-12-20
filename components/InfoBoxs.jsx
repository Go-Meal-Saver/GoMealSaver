import InfoBox from './InfoBox';

export default function InfoBoxes() {
  return (
    <>
      <section>
        <div className="container-xl lg:container m-auto py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
            <InfoBox
              heading="For Customers"
              backgroundColor="bg-white"
              textColor="text-green-800"
              buttonInfo={{
                text: 'Find Deals',
                link: '/meals',
                backgroundColor: 'bg-green-600 hover:bg-green-700',
              }}
            >
              Discover amazing deals on surplus food from your favorite
              restaurants. Save money while helping reduce food waste.
            </InfoBox>
            <InfoBox
              heading="For Restaurants"
              backgroundColor="bg-green-100"
              textColor="text-green-800"
              buttonInfo={{
                text: 'List GoMeal Food',
                link: '/meals/add',
                backgroundColor: 'bg-green-600 hover:bg-green-700',
              }}
            >
              Turn your surplus food into profit. Reach more customers and
              reduce waste while contributing to a sustainable future.
            </InfoBox>
          </div>
        </div>
      </section>
    </>
  );
}
