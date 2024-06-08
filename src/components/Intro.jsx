import React, { useEffect } from "react";
import IntroJs from "intro.js";
import "intro.js/introjs.css";

const Intro = () => {
  useEffect(() => {

    const intro = IntroJs(); // Initialize IntroJs
    intro.setOptions({
      steps:[
        {
            element:"#map",
            intro:"Rohit Multani Welcomes You to his Project UrbanRoute Explorer, Dedicated to Calculating the Shortest Distances and Visualizing Optimal Paths in Real-World Scenarios. Join him in Navigating the Most Efficient Routes and Enhancing Your Understanding of Spatial Navigation."
        },
        {
            element: "#open",
            intro: "Click to view Side Bar",
        },
        {
          element: "#algo",
          intro: "Select the type of Algorithm",
        },
        {
          element: "#city",
          intro: "Select City",
        },
        {
          element: "#visualize",
          intro: "Click on to start the algorithm",
        },
        {
          element: "#visited",
          intro: "Shows total distance travelled",
        },
        {
            element: "#short",
            intro: "Shows the Shortest Path Distance",
        },
        {
            element: "#toggle-dark-mode",
            intro: "Change the Map View",
            position:'left'
          },
        {
            element: "#clear",
            intro: "Clear the Map",
            position:'left'
          },
          {
            element: "#start",
            intro: "Start Point and End Point are Draggable, Drag to position it",
          }
        // Add more steps for other elements
      ]
    });


        intro.onchange((targetElement) => {
            console.log(targetElement)
          const currentStep = intro._currentStep; // Get the current step index
          if (currentStep === 1 || currentStep==9) { // Step 1 is at index 0
            const navbarToggleElement = document.querySelector("#open");
            console.log(navbarToggleElement)
            if (navbarToggleElement) {
              // Simulate click to open navbar
            navbarToggleElement.click();
            }

          }
        });
      
  
    intro.start(); // Start the introduction tour
  }, []); // Run only once after component mounted

  return null; // Intro component doesn't render anything
};

export default React.memo(Intro);