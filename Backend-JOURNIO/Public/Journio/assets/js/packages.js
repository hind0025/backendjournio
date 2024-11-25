const products = [
    {
      id: "01",
      productName: "Experience The Great Holiday On Beach",
      imgUrl: "./assets/images/packege-1.jpg",
      duration: "7D/6N",
      pax: "10",
      location: "Malaysia",
      reviewsCount: 25,
      price: 46500,
      rating: 5,
      shortDesc: "Experience the ultimate beach holiday with sun, sand, and relaxation like never before.",
    },
    {
      id: "02",
      productName: "Summer Holiday To The Oxolotan River",
      imgUrl: "./assets/images/packege-2.jpg",
      duration: "7D/6N",
      pax: "10",
      location: "Malaysia",
      reviewsCount: 20,
      price: 32240,
      rating: 5,
      shortDesc: "Embark on a summer holiday to the Oxolotan River for a serene escape surrounded by nature's beauty.",
    },
    {
      id: "03",
      productName: "Santorini Island's Weekend Vacation",
      imgUrl: "./assets/images/packege-3.jpg",
      duration: "7D/6N",
      pax: "10",
      location: "Malaysia",
      reviewsCount: 40,
      price: 41500,
      rating: 5,
      shortDesc: "Enjoy a perfect weekend getaway to Santorini Island, known for its stunning sunsets and breathtaking views.",
    },
  ];
  
  const packageList = document.getElementById("package-list");
  
  // Function to generate star ratings
  const generateStars = (rating) => {
    let stars = "";
    for (let i = 0; i < rating; i++) {
      stars += `<ion-icon name="star"></ion-icon>`;
    }
    return stars;
  };
  
  // Function to dynamically render products
//   products.forEach((product) => {
//     const productHTML = `
//       <li>
//         <div class="package-card">
//           <figure class="card-banner">
//             <img src="${product.imgUrl}" alt="${product.productName}" loading="lazy">
//           </figure>
//           <div class="card-content">
//             <h3 class="h3 card-title">${product.productName}</h3>
//             <p class="card-text">${product.shortDesc}</p>
//             <ul class="card-meta-list">
//               <li class="card-meta-item">
//                 <div class="meta-box">
//                   <ion-icon name="time"></ion-icon>
//                   <p class="text">${product.duration}</p>
//                 </div>
//               </li>
//               <li class="card-meta-item">
//                 <div class="meta-box">
//                   <ion-icon name="people"></ion-icon>
//                   <p class="text">pax: ${product.pax}</p>
//                 </div>
//               </li>
//               <li class="card-meta-item">
//                 <div class="meta-box">
//                   <ion-icon name="location"></ion-icon>
//                   <p class="text">${product.location}</p>
//                 </div>
//               </li>
//             </ul>
//           </div>
//           <div class="card-price">
//             <div class="wrapper">
//               <p class="reviews">(${product.reviewsCount} reviews)</p>
//               <div class="card-rating">
//                 ${generateStars(product.rating)}
//               </div>
//             </div>
//             <p class="price">
//               ₹${product.price.toLocaleString()}
//               <span>/ per person</span>
//             </p>
//             <button class="btn btn-secondary">Book Now</button>
//           </div>
//         </div>
//       </li>`;
//     packageList.innerHTML += productHTML;
//   });




products.forEach((product) => {
    const productHTML = `
      <li>
        <div class="package-card">
          <figure class="card-banner">
            <img src="${product.imgUrl}" alt="${product.productName}" loading="lazy">
          </figure>
          <div class="card-content">
            <h3 class="h3 card-title">${product.productName}</h3>
            <p class="card-text">${product.shortDesc}</p>
            <ul class="card-meta-list">
              <li class="card-meta-item">
                <div class="meta-box">
                  <ion-icon name="time"></ion-icon>
                  <p class="text">${product.duration}</p>
                </div>
              </li>
              <li class="card-meta-item">
                <div class="meta-box">
                  <ion-icon name="people"></ion-icon>
                  <p class="text">pax: ${product.pax}</p>
                </div>
              </li>
              <li class="card-meta-item">
                <div class="meta-box">
                  <ion-icon name="location"></ion-icon>
                  <p class="text">${product.location}</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="card-price">
            <div class="wrapper">
              <p class="reviews">(${product.reviewsCount} reviews)</p>
              <div class="card-rating">
                ${generateStars(product.rating)}
              </div>
            </div>
            <p class="price">
              ₹${product.price.toLocaleString()}
              <span>/ per person</span>
            </p>
            <!-- "Book Now" button with dynamic price -->
            <button class="btn btn-secondary book-now-btn" data-price="${product.price}" data-title="${product.productName}">Book Now</button>
          </div>
        </div>
      </li>`;
    packageList.innerHTML += productHTML;
  });

  
 
  