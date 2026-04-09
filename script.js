// ➤ Store selected character
let selectedCharacter = "";

// ➤ Open detail popup (NO backend call yet)
function orderCharacter(name) {

  // 👉 Close Orders popup if open
  document.getElementById("popup").style.display = "none";

  const character = characterDetails[name];
  selectedCharacter = name;

  document.getElementById("charName").innerText = name;
  document.getElementById("charAbout").innerText = character.about;
  document.getElementById("charPrice").innerText = "Price: ₹" + character.price;

  // 👉 Only set image if exists
  if (character.img) {
    document.getElementById("charImg").src = character.img;
  }

  document.getElementById("detailPopup").style.display = "block";
  document.getElementById("popup").style.display = "none";
}


// ➤ Load and display orders
async function loadOrders() {
  console.log("Orders clicked ✅");

  // 👉 Close detail popup first
  document.getElementById("detailPopup").style.display = "none";

  try {
    const res = await fetch("http://localhost:5000/orders");
    const data = await res.json();

    const popup = document.getElementById("popup");
    const ordersList = document.getElementById("ordersList");

    popup.style.display = "block";
    ordersList.innerHTML = "";

    // 👉 If no orders
    if (!data || Object.keys(data).length === 0) {
      ordersList.innerHTML = "<p>No orders yet 😅</p>";
      return;
    }

    let totalCost = 0; // ✅ total price

    for (let name in data) {
      const count = data[name];

      // 👉 get price safely
      const price = characterDetails[name]?.price || 0;

      const itemTotal = price * count;
      totalCost += itemTotal;

      const div = document.createElement("div");
      div.innerHTML = `<h3>${name} (x${count}) - ₹${itemTotal}</h3>`;
      ordersList.appendChild(div);
    }

    // 👉 show total cost
    const totalDiv = document.createElement("div");
    totalDiv.innerHTML = `<h2 style="margin-top:10px;">Total: ₹${totalCost}</h2>`;
    ordersList.appendChild(totalDiv);

  } catch (err) {
    console.error("❌ Error loading orders:", err);
  }
}

// ➤ Confirm order (send to backend)
async function confirmOrder() {
  try {
    await fetch("http://localhost:5000/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: selectedCharacter })
    });

    alert(selectedCharacter + " added successfully ✅");

    closeDetailPopup();

  } catch (error) {
    console.log(error);
  }
}


// ➤ Close detail popup
function closeDetailPopup() {
  document.getElementById("detailPopup").style.display = "none";
}


// ➤ Close Orders popup
function closePopup() {
  document.getElementById("popup").style.display = "none";
}


// ➤ Close when clicking outside (FIXED for BOTH popups)
window.onclick = function(event) {
  const popup = document.getElementById("popup");
  const detailPopup = document.getElementById("detailPopup");
  const aboutPopup = document.getElementById("aboutPopup");
  const contactPopup = document.getElementById("contactPopup");

  if (event.target === popup) popup.style.display = "none";
  if (event.target === detailPopup) detailPopup.style.display = "none";
  if (event.target === aboutPopup) aboutPopup.style.display = "none";
  if (event.target === contactPopup) contactPopup.style.display = "none";
};

// ➤ Drag popup
const popupBoxes = document.querySelectorAll(".popup-content");

popupBoxes.forEach((popupBox) => {
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  popupBox.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - popupBox.offsetLeft;
    offsetY = e.clientY - popupBox.offsetTop;
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      popupBox.style.position = "absolute";
      popupBox.style.left = (e.clientX - offsetX) + "px";
      popupBox.style.top = (e.clientY - offsetY) + "px";
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });
});

// ➤ Clear all orders
async function clearOrders() {
  await fetch("http://localhost:5000/orders", {
    method: "DELETE"
  });

  document.getElementById("ordersList").innerHTML = "<p>Orders cleared ✅</p>";
}


// ➤ Character data
const characterDetails = {
  "Iron Man": {
    about: "A powerful tank with high defense and strength.",
    price: 500
  },
  "Lady Boss": {
    about: "A fearless leader with strategic combat skills.",
    price: 700
  },
  "Bear Boy": {
    about: "A wild fighter with brute force abilities.",
    price: 400
  },
  "Gold Queen": {
    about: "A royal warrior with magical golden powers.",
    price: 900
  },
  "Arrow Girl": {
    about: "A sharp shooter with deadly accuracy.",
    price: 600
  }
};

function scrollToCharacters() {
  const section = document.getElementById("characters");

  section.scrollIntoView({
    behavior: "smooth"
  });

  // 👉 Add highlight effect
  section.classList.add("highlight");

  // 👉 Remove highlight after 2 sec
  setTimeout(() => {
    section.classList.remove("highlight");
  }, 2000);
}



function openAboutPopup() {
  console.log("About clicked ✅");

  // close other popups
  document.getElementById("popup").style.display = "none";
  document.getElementById("detailPopup").style.display = "none";

  // open about popup
  document.getElementById("aboutPopup").style.display = "block";
}

function closeAboutPopup() {
  document.getElementById("aboutPopup").style.display = "none";
}

function openContactPopup() {
  console.log("Contact clicked ✅");

  // 👉 close other popups
  document.getElementById("popup").style.display = "none";
  document.getElementById("detailPopup").style.display = "none";
  document.getElementById("aboutPopup").style.display = "none";

  // 👉 open contact popup
  document.getElementById("contactPopup").style.display = "block";
}

function closeContactPopup() {
  document.getElementById("contactPopup").style.display = "none";
}