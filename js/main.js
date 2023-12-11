// 1) Create createElemWithText, a function to create an HTML element with text content and optional class name

function createElemWithText(elementType = "p", textContent = "", className) {
    const newElement = document.createElement(elementType);
    newElement.textContent = textContent;
  
    if (className) {
      newElement.className = className;
    }
  
    return newElement;
  }
  
  // 2) Create createSelectOptions
  
  function createSelectOptions(users) {
    // Check if users parameter is undefined or null
    if (users === undefined || users === null) {
      return undefined;
    }
  
    // Loop through users data
    const options = [];
    for (const user of users) {
      // Create an option element
      const option = document.createElement("option");
  
      // Assign user ID to option value
      option.value = user.id;
  
      // Assign user name to option text content
      option.textContent = user.name;
  
      // Add option to the options array
      options.push(option);
    }
  
    // Return the array of options
    return options;
  }
  
  // 3) Create toggleCommentSection
  
  function toggleCommentSection(postId) {
    // Check if postId parameter is not provided
    if (postId === undefined) {
      console.error("postId parameter is required.");
      return undefined;
    }
  
    // Select the section element with the data-post-id attribute equal to the postId
    var section = document.querySelector(`[data-post-id="${postId}"]`);
  
    if (section) {
      // Toggle the 'hide' class on the section element
      section.classList.toggle('hide');
    } else {
      console.error(`Section with data-post-id="${postId}" not found.`);
    }
  
    return section;
  }
  
  // 4) Create toggleCommentButton
  
  function toggleCommentButton(postId) {
    // Check if postId parameter is not provided
    if (postId === undefined) {
      console.error("postId parameter is required.");
      return undefined;
    }
  
    // Select the button element with the data-post-id attribute equal to the postId
    var button = document.querySelector(`button[data-post-id="${postId}"]`);
  
    // Check if the button element exists
    if (button) {
      // Toggle the textContent based on the current value
      button.textContent = (button.textContent === 'Show Comments') ? 'Hide Comments' : 'Show Comments';
    } else {
      console.error(`Button with data-post-id="${postId}" not found.`);
    }
  
    // Return the button element (even if it's undefined)
    return button;
  }
  
  // 5) Create deleteChildElements
  
  function deleteChildElements(parentElement) {
    // Check if parentElement parameter is not provided or not an HTML element
    if (!parentElement || !(parentElement instanceof Element)) {
      console.error("An HTML element (parentElement) is required.");
      return undefined;
    }
  
    // Get the last child element of the parentElement
    var child = parentElement.lastElementChild;
  
    // Use a while loop to remove each child element
    while (child) {
      parentElement.removeChild(child);
      child = parentElement.lastElementChild; // Reassign child to the new last element
    }
  
    // Return the parentElement
    return parentElement;
  }
  
  // 6) Create addButtonListeners
  
  function addButtonListeners() {
    // Select all buttons nested inside the main element
    var buttons = document.querySelectorAll('main button');
  
    // Check if buttons exist
    if (buttons.length > 0) {
      // Loop through the NodeList of buttons
      buttons.forEach(function(button) {
        // Get the postId from button.dataset.postId
        var postId = button.dataset.postId;
  
        // If a postId exists, add a click event listener to the button
        if (postId) {
          button.addEventListener('click', function(event) {
            // Inside the anonymous function, call toggleComments with event and postId as parameters
            toggleComments(event, postId);
          });
        }
      });
  
      // Return the button elements which were selected
      return buttons;
    }
  
    // Return undefined if no buttons were found
    return undefined;
  }
  
  // 7) Create removeButtonListeners
  
  function removeButtonListeners() {
    // Select all buttons nested inside the main element
    var buttons = document.querySelectorAll('main button');
  
    if (buttons.length > 0) {
      buttons.forEach(function(button) {
        var postId = button.dataset.postId;
  
        // If a postId exists, remove the click event listener from the button
        if (postId) {
          // Define the same function used in addButtonListeners for consistency
          var clickHandler = function(event) {
            toggleComments(event, postId);
          };
  
          // Remove the click event listener
          button.removeEventListener('click', clickHandler);
        }
      });
  
      // Return the button elements which were selected
      return buttons;
    }
  
    // Return undefined if no buttons were found
    return undefined;
  }
  
  // 8) Create createComments
  
  function createComments(commentsData) {
    if (!commentsData || !Array.isArray(commentsData)) {
      console.error("Invalid or missing comments data.");
      return undefined;
    }
  
    // Create a document fragment
    const fragment = document.createDocumentFragment();
  
    // Loop through the comments
    commentsData.forEach(function(comment) {
      // Create an article element
      const article = document.createElement("article");
  
      // Create an h3 element with comment.name
      const h3 = createElemWithText('h3', comment.name);
  
      // Create a paragraph element with comment.body
      const bodyParagraph = createElemWithText('p', comment.body);
  
      // Create a paragraph element with `From: ${comment.email}`
      const emailParagraph = createElemWithText('p', `From: ${comment.email}`);
  
      // Append the h3 and paragraphs to the article element
      article.appendChild(h3);
      article.appendChild(bodyParagraph);
      article.appendChild(emailParagraph);
  
      // Append the article element to the fragment
      fragment.appendChild(article);
    });
  
    // Return the fragment element
    return fragment;
  }
  
  // 9) Create populateSelectMenu
  
  function populateSelectMenu(users) {
    // Check if users parameter is undefined or null
    if (users === undefined || users === null) {
      console.error("Invalid or missing users data.");
      return undefined;
    }
  
    const selectMenu = document.getElementById("selectMenu");
    if (!selectMenu) {
      console.error("Select menu element with id 'selectMenu' not found.");
      return undefined;
    }
  
    const options = createSelectOptions(users);
  
    // Check if options is not undefined
    if (options) {
      // Loop through the options and append each one to the select menu
      for (const option of options) {
        selectMenu.appendChild(option);
      }
    }
  
    // Return the selectMenu element
    return selectMenu;
  }
  
  // 10) Create getUsers
  
  async function getUsers() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
  
      if (!response.ok) {
        throw new Error(`Failed to fetch users. Status: ${response.status}`);
      }
  
      // Parse the JSON data from the response
      const usersData = await response.json();
  
      // Return the JSON data
      return usersData;
    } catch (error) {
      console.error('Error fetching users:', error.message);
      throw error; 
    }
  }
  
  // 11) Create getUserPosts
  
  async function getUserPosts(userId) {
    try {
      // Check if userId is provided
      if (userId === undefined || userId === null) {
        console.error("User ID is required.");
        return undefined;
      }
  
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  
      if (!response.ok) {
        throw new Error(`Failed to fetch user posts. Status: ${response.status}`);
      }
  
      // Parse the JSON data from the response
      const userPostsData = await response.json();
  
      // Return the JSON data
      return userPostsData;
    } catch (error) {
      console.error('Error fetching user posts:', error.message);
      throw error; 
    }
  }
  
  // 12) Create getUser
  
  async function getUser(userId) {
    try {
      // Check if userId is provided
      if (userId === undefined || userId === null) {
        console.error("User ID is required.");
        return undefined;
      }
  
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch user data. Status: ${response.status}`);
      }
  
      // Parse the JSON data from the response
      const userData = await response.json();
  
      // Return the JSON data
      return userData;
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      throw error; 
    }
  }
  
  // 13) Create getPostComments
  
  async function getPostComments(postId) {
    try {
      // Check if postId is provided
      if (postId === undefined || postId === null) {
        console.error("Post ID is required.");
        return undefined;
      }
  
      const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch post comments. Status: ${response.status}`);
      }
  
      // Parse the JSON data from the response
      const postCommentsData = await response.json();
  
      // Return the JSON data
      return postCommentsData;
    } catch (error) {
      console.error('Error fetching post comments:', error.message);
      throw error; 
    }
  }
  
  // 14) Create displayComments
  
  async function displayComments(postId) {
    try {
      // Check if postId is provided
      if (postId === undefined || postId === null) {
        console.error("Post ID is required.");
        return undefined;
      }
  
      // Create a section element
      const section = document.createElement("section");
  
      // Set an attribute on the section element with section.dataset.postId
      section.dataset.postId = postId;
  
      // Add the classes 'comments' and 'hide'
      section.classList.add('comments', 'hide');
  
      // Fetch comments for the specific post
      const comments = await getPostComments(postId);
  
      // Create a variable named fragment equal to createComments(comments)
      const fragment = createComments(comments);
  
      // Append the fragment
      section.appendChild(fragment);
  
      // Return the section element
      return section;
    } catch (error) {
      console.error('Error displaying comments:', error.message);
      throw error; 
    }
  }
  
  // 15) Create createPosts
  
  async function createPosts(postsData) {
    try {
      // Check if postsData is provided and is an array
      if (!postsData || !Array.isArray(postsData)) {
        console.error("Invalid or missing posts data.");
        return undefined;
      }
  
      const fragment = document.createDocumentFragment();
      for (const post of postsData) {
        // Create an article element
        const article = document.createElement("article");
  
        // Create an h2 element with the post title
        const title = createElemWithText('h2', post.title);
  
        // Create a p element with the post body
        const body = createElemWithText('p', post.body);
  
        // Create a p element with text of `Post ID: ${post.id}`
        const postId = createElemWithText('p', `Post ID: ${post.id}`);
  
        // Define an author variable
        const author = await getUser(post.userId);
  
        // Create a p element with text of `Author: ${author.name} with ${author.company.name}`
        const authorInfo = createElemWithText('p', `Author: ${author.name} with ${author.company.name}`);
  
        // Create a p element with the author’s company catch phrase
        const companyCatchPhrase = createElemWithText('p', author.company.catchPhrase);
  
        // Create a button 'Show Comments'
        const showCommentsButton = createElemWithText('button', 'Show Comments');
  
        // Set an attribute on the button with button.dataset.postId = post.id
        showCommentsButton.dataset.postId = post.id;
  
        // Append the elements to the article element
        article.appendChild(title);
        article.appendChild(body);
        article.appendChild(postId);
        article.appendChild(authorInfo);
        article.appendChild(companyCatchPhrase);
        article.appendChild(showCommentsButton);
  
    
        const section = await displayComments(post.id);
  
        // Append the section
        article.appendChild(section);
  
        // Append the article
        fragment.appendChild(article);
      }
  
      // Return the fragment element
      return fragment;
    } catch (error) {
      console.error('Error creating posts:', error.message);
      throw error; 
    }
  }
  
  // 16) Create displayPosts
  
  async function displayPosts(postsData) {
    try {
      // Check if postsData is provided and is an array
  if (!postsData || !Array.isArray(postsData)) {
    console.error("Invalid or missing posts data.");
    // Create a paragraph element with the default-text class
    const defaultParagraph = createElemWithText('p', 'No posts available.');
    defaultParagraph.classList.add('default-text');
    // Return the paragraph element
    return defaultParagraph;
  }
  
      // Select the main element
      const mainElement = document.querySelector('main');
  
      // Define a variable named element
      const element = await createPosts(postsData);
  
      // Append the element to the main element
      mainElement.appendChild(element);
  
      // Return the element variable
      return element;
    } catch (error) {
      console.error('Error displaying posts:', error.message);
      throw error; 
    }
  }
  
  // 17) Create toggleComments
  
  function toggleComments(event, postId) {
    try {
      // Check if postId is provided
      if (postId === undefined || postId === null) {
        console.error("Post ID is required.");
        return undefined;
      }
  
      // Set event.target.listener = true
      event.target.listener = true;
  
      // Call toggleCommentSection
      const section = toggleCommentSection(postId);
  
      // Call toggleCommentButton
      const button = toggleCommentButton(postId);
  
      // Return an array containing the section and button elements
      return [section, button];
    } catch (error) {
      console.error('Error toggling comments:', error.message);
      throw error; 
    }
  }
  
  // 18) Create refreshPosts
  
  async function refreshPosts(postsData) {
    try {
      // Check if postsData is provided and is an array
      if (!postsData || !Array.isArray(postsData)) {
        console.error("Invalid or missing posts data.");
        return undefined;
      }
  
      // Call removeButtonListeners
      const removeButtons = removeButtonListeners();
  
      // Call deleteChildElements
      const main = document.querySelector('main');
      const mainElement = deleteChildElements(main);
  
      // Pass posts JSON data
      const fragment = await displayPosts(postsData);
  
      // Call addButtonListeners
      const addButtons = addButtonListeners();
  
      // Return an array of the results from the functions called
      return [removeButtons, mainElement, fragment, addButtons];
    } catch (error) {
      console.error('Error refreshing posts:', error.message);
      throw error; 
    }
  }
  
  // 19) Create selectMenuChangeEventHandler
  
  const selectMenuChangeEventHandler = async (e) => {
      try {
          const userId = e?.target?.value || 1;
          const posts = await getUserPosts(userId);
          const refreshPostsArray = await refreshPosts(posts);
          return [userId, posts, refreshPostsArray];
      } catch (error) {
          console.error("An error occurred in selectMenuChangeEventHandler:", error);
          throw error;
      }
  };
  
  // 20) Create initPage
  
  async function initPage() {
    try {
      // Call await getUsers
      const users = await getUsers();
  
      // Call populateSelectMenu with users data
      const select = await populateSelectMenu(users);
  
      // Return an array with users JSON data and the select element
      return [users, select];
    } catch (error) {
      console.error('Error in initPage:', error.message);
      throw error;
    }
  }
  
  
  // 21) Create initApp
  function initApp() {
      try {
          // Call initPage to get users and select menu
          const [users, selectMenu] = initPage();
  
          // Select the #selectMenu element by id
          const selectMenuElement = document.getElementById('selectMenu');
  
          // Check if selectMenuElement exists
          if (selectMenuElement) {
              // Add an event listener to #selectMenu for the "change" event
              selectMenuElement.addEventListener('change', async (event) => {
                  try {
                      // Call selectMenuChangeEventHandler when the change event fires
                      const result = await selectMenuChangeEventHandler(event);
                      if (result !== null && result !== undefined) {
                          const [userId, posts, refreshPostsArray] = result;
                          console.log('Selected User ID:', userId);
                          console.log('User Posts:', posts);
                          console.log('Refreshed Posts Array:', refreshPostsArray);
                      } else {
                          console.error('Undefined or null result from selectMenuChangeEventHandler.');
                      }
                  } catch (error) {
                      console.error('Error in selectMenuChangeEventHandler:', error.message);
                  }
              });
          } else {
              console.error('#selectMenu element not found.');
          }
      } catch (error) {
          console.error('Error in initApp:', error.message);
      }
  }
  
  document.addEventListener('DOMContentLoaded', initApp);
  
