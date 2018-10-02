module.exports = {
  CategoryQuery: () => `
    CREATE TABLE IF NOT EXISTS category(
      id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
      slug string,
      name string
    )
  `,
  RestaurantQuery: () => `
    CREATE TABLE IF NOT EXISTS restaurant(
      id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name string,
      address string,
      yelp_link string,
      image_url string,
      popularity int,
      rating int,
      price string
    )
  `,
  RestaurantCategoryQuery: () => `
    CREATE TABLE IF NOT EXISTS restaurant_category(
      restaurant_id int,
      category_id int,
      foreign key (restaurant_id) references restaurant(id),
      foreign key (category_id) references category(id),
    )
  `
}
