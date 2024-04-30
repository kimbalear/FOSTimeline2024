This project uses MongoDB to manage the databases. MongoDB collections are located in the project's `mongo` folder.

## Setting

To connect to MongoDB, make sure MongoDB is running on your system and the connection URL is set correctly in `server.js`.

### MongoDB Collections

The collections used in this project can be found in the `mongo` folder and are essential for the proper functioning of the implemented functionalities.

## Dependencies

This project uses several key dependencies to function correctly:

- **Express**: Server framework to handle HTTP requests.
- **Cors**: Used to allow or restrict requested resources on a web server depending on where the request comes from.
- **MongoDB**: Database to store data from the mentioned collections.
- **Bootstrap**: Facilitates rapid development with a CSS framework for responsive design.

Make sure you install all dependencies by running `npm install` inside the project directory.

## Rapid Development

For faster development, this project uses Bootstrap, I'm not trying to use it, it's just as a demonstration of what the elements should look like.



Hello TRan, it is already resolved...

# HTML structure explanation:

# Contributions
<div class="pnl_top">
  <div class="contributions">
    <div class="contributions_cont">
      <div class="inner_content">
        <div class="listcards">
          <div>Card 1</div>
          <div>Card 2</div>
        </div>
      </div>
    </div>
  </div>
  <div class="line"></div>
</div>

# Needs:
<div class="pnl_btm">
  <div class="line"></div>
  <div class="needs">
    <div class="needs_cont">
      <div class="inner_content">
        <div class="listcards">
          <div>Item 1</div>
          <div>Item 2</div>
        </div>
      </div>
    </div>
  </div>
</div>


.pnl_top/.pnl_btm: It is the main container that display: grid uses to organize its internal elements.
.contributions/.needs: Defines an area within the grid layout. Here the background and other styles related to this section are handled.
.contributions_cont/.needs_cont: Acts as an overflow container that doesn't allow internal content to overhang and is where you apply borders and background styles.
.inner_content: This new container is where vertical scrolling is applied (overflow-y: auto), and is the one that actually contains the scrollable content. This is where a padding-right is added to keep the scroll bar separate from the content.
.listcards: Within .inner_content, handles individual cards or list items that are scrolled.
