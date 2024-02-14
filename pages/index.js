import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A First Meetup',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
    address: 'Some address 5, 12345 Some City',
    description: 'This is a first meetup!'
  },
  {
    id: 'm2',
    title: 'A Second Meetup',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
    address: 'Some address 10, 12345 Some City',
    description: 'This is a second meetup!'
  }
];

function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

// export async function getServerSideProps(context){//server side rendering SSR, we use here context for api data
//   //fetch data from API
//   const req = context.req;//ye request jo hme server se milta h request krne me jo use handle krne ke liye
//   const res = context.res;// ye response jb data se jo bhi response lena rehta h use handle krne ke liye
//   return{
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }//ye bhi same getStaticProps jaisa h bs isme revalidate ni dena padta jisse apne aap pure time kuchh seconds me data fetch hoke component pre render ho isiliye getServerSideProps sirf tabhi update karke pre render karega jb request aayegi isliye yha revalidate ni use krte and jb frequently data change ho ya perticular user ya autehnctication ke hisab se data show hona ho tabhi ye use krna h

export async function getStaticProps(){//it is SSG static site generation, use when data don't change frequently
  //here we can perform any useEffect or fetch data from API
  return{
    props: {
      meetups: DUMMY_MEETUPS,
    },
    revalidate: 10 //this revalidate is like getStaticProps sirf product build time chalke data loads krke component ko deta h fir preRender hota h pr uske baad bhi agar koi data change hona ho to dobara product build krke deploy na krna pade isiliye hm revalidate use krte h jisko time dete h seconds me yha hmne 10 second diya h taki app me koi changes request kiye to hr 10 seconds me compnent pre render hoga updated data ke sath and replace karega purane data se new pages ko and build time only pages hi build hote h
  };
};//getStaticProps is reserved function of nextjs, before component renders nextjs call this function and this we can use here async so that pre rendering waits for this fucntion to loads the data in component for pre rendering this function takes props as data and loads the data to component then component renders with data and in pre rendering HTML page have data which is not undefined now. so this solves the propblem which we faced in useEffect

export default HomePage;