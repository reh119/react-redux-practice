// use ProfileCard COmponent
import ProfileCard from "./ProfileCard"; // same directory as app fille
import AlexaImage from "./images/alexa.png"; // for images we need extension like png etc
import CortanaImage from "./images/cortana.png";
import SiriImage from "./images/siri.png";
import "bulma/css/bulma.css"; // css library

function App() {
  return (
    <div>
        <section className="hero is-primary">
            <div className="hero-body">
                <p className="title">Personal Digital Assistance</p>
            </div>
        </section>
      <div>
        
        <div className="container">
          <section className="section">
            <div className="columns">
              <div className="column is-4">
              <ProfileCard title="Alexa"
               handle="@alexa99" 
               image={AlexaImage}
               description = 'Alexa was created by Amazon and helps you buy things ' />
              </div>
              <div className="column is-4">
              <ProfileCard title="Cortana"
               handle="@cortona32" 
               image={CortanaImage}
               description = 'Cortana was created by Microsoft and who knows what it does'/>
              </div>
              <div className="column is-4">
              <ProfileCard title="Siri"
               handle="@siri01" 
               image={SiriImage}
               description = 'Siri was created by Apple and helps you do things'
                />
              </div>
            </div>
          </section>
        </div>
       
      
       
      </div>
    </div>
  );
}
export default App;

/* 
The problem we are trying to solve here is, we have three similar profile cards we are tying to create but they will each have different contents. 
We are using re usable component called ProfileCard but the contents inside will be different

So we want to communicate from parent component to child component, we will use prop system. 

Prop System: 
1.) Pass Data from parent to child 
2.) allows a parent to configure each child differently( show different text, styles etc)
3.) One way flow of data. Child cant push props back up, flow is only one way 
4.) about 25% of react. Props are important
Parent Component ----> *propsobject*--->ChildComponent
Really good practice to draw diagram to show flow of data here. some sort of hierchy
*/
