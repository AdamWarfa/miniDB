export default class PeopleRenderer {
  constructor(list, container, itemRenderer) {
    this.renderers = [];
    this.container = document.querySelector(container);
    this.filterProperty = "";
    this.filterValue = "";
    this.sortBy = "";
    this.sortDir = "asc";
    this.items = list;
    this.itemRenderer = itemRenderer;
  }

  clear() {
    this.renderers = [];
    this.container.innerHTML = "";
  }

  render() {
    for (const item of this.items) {
      const renderer = new this.itemRenderer();
      renderer.item = item;
      this.renderers.push(renderer);
    }

    let renderers = this.renderers;

    let filteredList;
    if (this.filterProperty == "") {
      filteredList = renderers;
    } else {
      console.log(this.filterProperty);
      filteredList = renderers.filter((item) => {
        const propertyValue = item.item[this.filterProperty];
        if (propertyValue) {
          return propertyValue.toLowerCase().includes(this.filterValue.toLowerCase());
        }
        return false; // Return false if the property is undefined
      });
    }

    for (const renderer of filteredList) {
      try {
        const html = renderer.render();
        this.container.insertAdjacentHTML("beforeend", html);

        if (renderer.postRender) {
          const element = this.container.lastElementChild;
          // const button = document.querySelector(".btn-connect").lastElementChild;

          renderer.postRender(element);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  sort(sortBy, sortDir) {
    if (sortBy == "name" && sortDir == "asc") {
      this.items.sort((a, b) => a.name.localeCompare(b.name));
      this.sortDir = "asc";
      this.sortBy = "name";
    } else if (sortBy == "name" && sortDir == "desc") {
      this.items.sort((a, b) => b.name.localeCompare(a.name));
      this.sortDir = "desc";
      this.sortBy = "name";
    }
    this.clear();
    this.render();
  }

  filter(filterProperty, filterValue) {
    console.log(filterProperty.toLowerCase(), filterValue);

    this.filterProperty = filterProperty;
    this.filterValue = filterValue;

    this.clear();
    this.render();
  }
}
