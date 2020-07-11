import React, { Component } from 'react';

class RestaurantInfo2 extends Component {
    constructor(props){
        super(props);
        this.state = {
                    categorys: [
                      {
                        "id": "26576",
                        "name": "Appeteasers",
                        "position": "0",
                        "menuitems": [
                          {
                            "id": "94298",
                            "name": "3 Chicken Wings",
                            "position": 1,
                            "description": "Tender, Spicy and Juicy. Original or Peri-Crusted",
                            "images": [],
                            "subitems": [
                              {
                                "id": "224471",
                                "name": "3 Chicken Wings",
                                "position": 1,
                                "price": "250.00",
                                "consumable": "1:1",
                                "cuisine_name": "Indian",
                                "category_name": "Appeteasers",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              }
                            ]
                          },
                          {
                            "id": "94301",
                            "name": "Chicken Livers and Portuguese Roll",
                            "position": 2,
                            "description": "Chicken Livers Topped with PERi-PERi Sauce, Served with A Roll To Soak Up The Sauce",
                            "images": [],
                            "subitems": [
                              {
                                "id": "224474",
                                "name": "Chicken Livers and Portuguese Roll",
                                "position": 1,
                                "price": "250.00",
                                "consumable": "1:1",
                                "cuisine_name": "Indian",
                                "category_name": "Appeteasers",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              }
                            ]
                          },
                          {
                            "id": "94304",
                            "name": "Spicy Mixed Olives (V)",
                            "position": 3,
                            "description": "Co-Starring Garlic, Pepper and Chili",
                            "images": [],
                            "subitems": [
                              {
                                "id": "224477",
                                "name": "Spicy Mixed Olives (V)",
                                "position": 1,
                                "price": "215.00",
                                "consumable": "1:1",
                                "cuisine_name": "Indian",
                                "category_name": "Appeteasers",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              }
                            ]
                          },
                          {
                            "id": "94307",
                            "name": "Hummus with PERI-PERI Drizzle (V)",
                            "position": 4,
                            "description": "Pour Smoky PERi-PERi Oil Over Creamy Hummus and Dig in with Strips Of Warm Pita",
                            "images": [],
                            "subitems": [
                              {
                                "id": "224480",
                                "name": "Hummus with PERI-PERI Drizzle (V)",
                                "position": 1,
                                "price": "215.00",
                                "consumable": "1:1",
                                "cuisine_name": "Indian",
                                "category_name": "Appeteasers",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              }
                            ]
                          },
                          {
                            "id": "94310",
                            "name": "Red Pepper Dip (V)",
                            "position": 5,
                            "description": "Dive Into Temping Roasted Red Pepper and Chili Spice Dip with Warm Pita Strips",
                            "images": [],
                            "subitems": [
                              {
                                "id": "224483",
                                "name": "Red Pepper Dip (V)",
                                "position": 1,
                                "price": "205.00",
                                "consumable": "1:1",
                                "cuisine_name": "Indian",
                                "category_name": "Appeteasers",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              }
                            ]
                          },
                          {
                            "id": "94313",
                            "name": "Appeteaser Platter",
                            "position": 6,
                            "description": "Choose any Three Appeteasers",
                            "images": [],
                            "subitems": [
                              {
                                "id": "224486",
                                "name": "Appeteaser Platter",
                                "position": 1,
                                "price": "615.00",
                                "consumable": "1:1",
                                "cuisine_name": "Indian",
                                "category_name": "Appeteasers",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              }
                            ]
                          },
                          {
                            "id": "94316",
                            "name": "All Together Now (V)",
                            "position": 7,
                            "description": "Spicy Mixed Olives, Red Pepper Dip, Hummus with PERi-PERi Drizzle and Warm Pita Strips",
                            "images": [],
                            "subitems": [
                              {
                                "id": "224489",
                                "name": "All Together Now (V)",
                                "position": 1,
                                "price": "520.00",
                                "consumable": "1:1",
                                "cuisine_name": "Indian",
                                "category_name": "Appeteasers",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "id": "26582",
                        "name": "Fino sides",
                        "position": "0",
                        "menuitems": [
                          {
                            "id": "94334",
                            "name": "PERi-PERi Wedges (P)",
                            "position": 8,
                            "description": "",
                            "images": [],
                            "subitems": [
                              {
                                "id": "224522",
                                "name": "Regular",
                                "position": 1,
                                "price": "190.00",
                                "consumable": "1:1",
                                "cuisine_name": "Fast Food",
                                "category_name": "Fino sides",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              },
                              {
                                "id": "224525",
                                "name": "Large",
                                "position": 2,
                                "price": "330.00",
                                "consumable": "1:1",
                                "cuisine_name": "Fast Food",
                                "category_name": "Fino sides",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              }
                            ]
                          },
                          {
                            "id": "94337",
                            "name": "Corn-On-The-Cob",
                            "position": 9,
                            "description": "",
                            "images": [],
                            "subitems": [
                              {
                                "id": "224528",
                                "name": "Regular",
                                "position": 1,
                                "price": "190.00",
                                "consumable": "1:1",
                                "cuisine_name": "Fast Food",
                                "category_name": "Fino sides",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              },
                              {
                                "id": "224531",
                                "name": "Large",
                                "position": 2,
                                "price": "330.00",
                                "consumable": "1:1",
                                "cuisine_name": "Fast Food",
                                "category_name": "Fino sides",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "id": "26588",
                        "name": "Peri-peri chicken",
                        "position": "0",
                        "menuitems": [
                          {
                            "id": "94349",
                            "name": "1/4 Chicken",
                            "position": 10,
                            "description": "Quarter Chicken Marinated with PERi-PERi Sauce and Grilled",
                            "images": [],
                            "subitems": [
                              {
                                "id": "224543",
                                "name": "On its own",
                                "position": 1,
                                "price": "385.00",
                                "consumable": "1:1",
                                "cuisine_name": "Indian",
                                "category_name": "Peri-peri chicken",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              },
                              {
                                "id": "224546",
                                "name": "With 1 Regular Side",
                                "position": 2,
                                "price": "485.00",
                                "consumable": "1:1",
                                "cuisine_name": "Indian",
                                "category_name": "Peri-peri chicken",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              },
                              {
                                "id": "224549",
                                "name": "With 2 Regular Sides",
                                "position": 3,
                                "price": "575.00",
                                "consumable": "1:1",
                                "cuisine_name": "Indian",
                                "category_name": "Peri-peri chicken",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              }
                            ]
                          },
                          {
                            "id": "94352",
                            "name": "1/2 Chicken",
                            "position": 11,
                            "description": "Half Chicken Marinated with PERi-PERi Sauce and Grilled",
                            "images": [],
                            "subitems": [
                              {
                                "id": "224552",
                                "name": "On its own",
                                "position": 1,
                                "price": "685.00",
                                "consumable": "1:1",
                                "cuisine_name": "Indian",
                                "category_name": "Peri-peri chicken",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              },
                              {
                                "id": "224555",
                                "name": "With 1 Regular Side",
                                "position": 2,
                                "price": "785.00",
                                "consumable": "1:1",
                                "cuisine_name": "Indian",
                                "category_name": "Peri-peri chicken",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              },
                              {
                                "id": "224558",
                                "name": "With 2 Regular Sides",
                                "position": 3,
                                "price": "875.00",
                                "consumable": "1:1",
                                "cuisine_name": "Indian",
                                "category_name": "Peri-peri chicken",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              }
                            ]
                          },
                          {
                            "id": "94355",
                            "name": "5 Chicken Wings",
                            "position": 12,
                            "description": "Original Flavours or PERi-PEREi Crusted (P)",
                            "images": [],
                            "subitems": [
                              {
                                "id": "224561",
                                "name": "On its own",
                                "position": 1,
                                "price": "475.00",
                                "consumable": "1:1",
                                "cuisine_name": "Indian",
                                "category_name": "Peri-peri chicken",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              },
                              {
                                "id": "224564",
                                "name": "With 1 Regular Side",
                                "position": 2,
                                "price": "575.00",
                                "consumable": "1:1",
                                "cuisine_name": "Indian",
                                "category_name": "Peri-peri chicken",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              },
                              {
                                "id": "224567",
                                "name": "With 2 Regular Sides",
                                "position": 3,
                                "price": "665.00",
                                "consumable": "1:1",
                                "cuisine_name": "Indian",
                                "category_name": "Peri-peri chicken",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              }
                            ]
                          },
                          {
                            "id": "94358",
                            "name": "Wing Roulette",
                            "position": 13,
                            "description": "10 Wings in PERi-PERi Flavors",
                            "images": [],
                            "subitems": [
                              {
                                "id": "224570",
                                "name": "Wing Roulette",
                                "position": 1,
                                "price": "750.00",
                                "consumable": "1:1",
                                "cuisine_name": "Indian",
                                "category_name": "Peri-peri chicken",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              }
                            ]
                          },
                          {
                            "id": "94361",
                            "name": "Whole Chicken",
                            "position": 14,
                            "description": "Whole Chicken Marinated in PERi-PERi Sauce and Grilled",
                            "images": [],
                            "subitems": [
                              {
                                "id": "224573",
                                "name": "Whole Chicken",
                                "position": 1,
                                "price": "1350.00",
                                "consumable": "1:4",
                                "cuisine_name": "Indian",
                                "category_name": "Peri-peri chicken",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              }
                            ]
                          },
                          {
                            "id": "94364",
                            "name": "Chicken Butterfly",
                            "position": 15,
                            "description": "Succulent Double Chicken Breast in Crispy Skin",
                            "images": [],
                            "subitems": [
                              {
                                "id": "224576",
                                "name": "On its own",
                                "position": 1,
                                "price": "495.00",
                                "consumable": "1:1",
                                "cuisine_name": "Indian",
                                "category_name": "Peri-peri chicken",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              },
                              {
                                "id": "224579",
                                "name": "With 1 Regular Side",
                                "position": 2,
                                "price": "595.00",
                                "consumable": "1:1",
                                "cuisine_name": "Indian",
                                "category_name": "Peri-peri chicken",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              },
                              {
                                "id": "224582",
                                "name": "With 2 Regular Sides",
                                "position": 3,
                                "price": "685.00",
                                "consumable": "1:1",
                                "cuisine_name": "Indian",
                                "category_name": "Peri-peri chicken",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              }
                            ]
                          },
                          {
                            "id": "94367",
                            "name": "Espetada",
                            "position": 16,
                            "description": "Tender Marinated Chicken Thighs and Fresh Peppers, Served on a Skewer",
                            "images": [],
                            "subitems": [
                              {
                                "id": "224585",
                                "name": "On its own",
                                "position": 1,
                                "price": "695.00",
                                "consumable": "1:1",
                                "cuisine_name": "Indian",
                                "category_name": "Peri-peri chicken",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              },
                              {
                                "id": "224588",
                                "name": "With 1 Regular Side",
                                "position": 2,
                                "price": "795.00",
                                "consumable": "1:1",
                                "cuisine_name": "Indian",
                                "category_name": "Peri-peri chicken",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              },
                              {
                                "id": "224591",
                                "name": "With 2 Regular Sides",
                                "position": 3,
                                "price": "885.00",
                                "consumable": "1:1",
                                "cuisine_name": "Indian",
                                "category_name": "Peri-peri chicken",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              }
                            ]
                          },
                          {
                            "id": "94370",
                            "name": "Espetada Carnival",
                            "position": 17,
                            "description": "Flame-Grilled PERi-PERi Thighs, Stuffed with Feta and Parsley, Skewered with Mixed Peppers",
                            "images": [],
                            "subitems": [
                              {
                                "id": "224594",
                                "name": "On its own",
                                "position": 1,
                                "price": "825.00",
                                "consumable": "1:1",
                                "cuisine_name": "Indian",
                                "category_name": "Peri-peri chicken",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              },
                              {
                                "id": "224597",
                                "name": "With 1 Regular Side",
                                "position": 2,
                                "price": "925.00",
                                "consumable": "1:1",
                                "cuisine_name": "Indian",
                                "category_name": "Peri-peri chicken",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              },
                              {
                                "id": "224600",
                                "name": "With 2 Regular Sides",
                                "position": 3,
                                "price": "1015.00",
                                "consumable": "1:1",
                                "cuisine_name": "Indian",
                                "category_name": "Peri-peri chicken",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              }
                            ]
                          },
                          {
                            "id": "94373",
                            "name": "Grilled Chicken Tenders",
                            "position": 18,
                            "description": "Juicy and Tender, Delicious with All Sides",
                            "images": [],
                            "subitems": [
                              {
                                "id": "224603",
                                "name": "On its own",
                                "position": 1,
                                "price": "200.00",
                                "consumable": "1:1",
                                "cuisine_name": "Indian",
                                "category_name": "Peri-peri chicken",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              },
                              {
                                "id": "224606",
                                "name": "With 1 Regular Side",
                                "position": 2,
                                "price": "300.00",
                                "consumable": "1:1",
                                "cuisine_name": "Indian",
                                "category_name": "Peri-peri chicken",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              },
                              {
                                "id": "224609",
                                "name": "With 2 Regular Sides",
                                "position": 3,
                                "price": "390.00",
                                "consumable": "1:1",
                                "cuisine_name": "Indian",
                                "category_name": "Peri-peri chicken",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "id": "26594",
                        "name": "Sharing platters",
                        "position": "0",
                        "menuitems": [
                          {
                            "id": "94379",
                            "name": "Full Platter",
                            "position": 19,
                            "description": "For 3-4 People, Whole Chicken with  2 Large or 4 Regular Rides",
                            "images": [],
                            "subitems": [
                              {
                                "id": "224615",
                                "name": "With 2 Large Sides",
                                "position": 1,
                                "price": "1765.00",
                                "consumable": "1:4",
                                "cuisine_name": "Fast Food",
                                "category_name": "Sharing platters",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              },
                              {
                                "id": "224618",
                                "name": "With 4 Regular Sides",
                                "position": 2,
                                "price": "1765.00",
                                "consumable": "1:4",
                                "cuisine_name": "Fast Food",
                                "category_name": "Sharing platters",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              }
                            ]
                          },
                          {
                            "id": "94382",
                            "name": "No Bones Platter",
                            "position": 20,
                            "description": "For 2-3 People, Chicken Butterfly and a Espetada, with 2 Large or 4 Regular Sides",
                            "images": [],
                            "subitems": [
                              {
                                "id": "224621",
                                "name": "With 2 Large Sides",
                                "position": 1,
                                "price": "1550.00",
                                "consumable": "1:3",
                                "cuisine_name": "Indian",
                                "category_name": "Sharing platters",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              },
                              {
                                "id": "224624",
                                "name": "With 4 Regular Sides",
                                "position": 2,
                                "price": "1550.00",
                                "consumable": "1:3",
                                "cuisine_name": "Indian",
                                "category_name": "Sharing platters",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              }
                            ]
                          },
                          {
                            "id": "94385",
                            "name": "Jumbo Platter",
                            "position": 21,
                            "description": "For 4-6 People, 2 Whole Chickens and 5 Large Sides",
                            "images": [],
                            "subitems": [
                              {
                                "id": "224627",
                                "name": "Jumbo Platter",
                                "position": 1,
                                "price": "3595.00",
                                "consumable": "1:6",
                                "cuisine_name": "Fast Food",
                                "category_name": "Sharing platters",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "id": "26600",
                        "name": "Dessert",
                        "position": "0",
                        "menuitems": [
                          {
                            "id": "94399",
                            "name": "Dessert",
                            "position": 22,
                            "description": "",
                            "images": [],
                            "subitems": [
                              {
                                "id": "224665",
                                "name": "Caramel Cheese Cake",
                                "position": 1,
                                "price": "230.00",
                                "consumable": "1:1",
                                "cuisine_name": "Desserts",
                                "category_name": "Dessert",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              },
                              {
                                "id": "224668",
                                "name": "Lighten Up Chocolate Cake",
                                "position": 2,
                                "price": "230.00",
                                "consumable": "1:1",
                                "cuisine_name": "Desserts",
                                "category_name": "Dessert",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "id": "26579",
                        "name": "Sides",
                        "position": "0",
                        "menuitems": [
                          {
                            "id": "94319",
                            "name": "PERi-PERi Chips (P)",
                            "position": 23,
                            "description": "Crunchy Chips with PERi-PERi Sauce",
                            "images": [],
                            "subitems": [
                              {
                                "id": "224492",
                                "name": "Regular",
                                "position": 1,
                                "price": "130.00",
                                "consumable": "1:1",
                                "cuisine_name": "Indian",
                                "category_name": "Sides",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              },
                              {
                                "id": "224495",
                                "name": "Large",
                                "position": 2,
                                "price": "220.00",
                                "consumable": "1:1",
                                "cuisine_name": "Indian",
                                "category_name": "Sides",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              }
                            ]
                          },
                          {
                            "id": "94322",
                            "name": "Spicy Rice",
                            "position": 24,
                            "description": "Spicy fried rice",
                            "images": [],
                            "subitems": [
                              {
                                "id": "224498",
                                "name": "Regular",
                                "position": 1,
                                "price": "130.00",
                                "consumable": "1:1",
                                "cuisine_name": "Indian",
                                "category_name": "Sides",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              },
                              {
                                "id": "224501",
                                "name": "Large",
                                "position": 2,
                                "price": "220.00",
                                "consumable": "1:1",
                                "cuisine_name": "Indian",
                                "category_name": "Sides",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              }
                            ]
                          },
                          {
                            "id": "94325",
                            "name": "Coleslaw (M)",
                            "position": 25,
                            "description": "Cabbage, Carrot, Nando&amp;#039;s Special Mayonnaise",
                            "images": [],
                            "subitems": [
                              {
                                "id": "224504",
                                "name": "Regular",
                                "position": 1,
                                "price": "130.00",
                                "consumable": "1:1",
                                "cuisine_name": "Indian",
                                "category_name": "Sides",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              },
                              {
                                "id": "224507",
                                "name": "Large",
                                "position": 2,
                                "price": "220.00",
                                "consumable": "1:1",
                                "cuisine_name": "Indian",
                                "category_name": "Sides",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              }
                            ]
                          },
                          {
                            "id": "94328",
                            "name": "Grilled Veg",
                            "position": 26,
                            "description": "Grilled Assorted Vegetables",
                            "images": [],
                            "subitems": [
                              {
                                "id": "224510",
                                "name": "Regular",
                                "position": 1,
                                "price": "130.00",
                                "consumable": "1:1",
                                "cuisine_name": "Indian",
                                "category_name": "Sides",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              },
                              {
                                "id": "224513",
                                "name": "Large",
                                "position": 2,
                                "price": "220.00",
                                "consumable": "1:1",
                                "cuisine_name": "Indian",
                                "category_name": "Sides",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              }
                            ]
                          },
                          {
                            "id": "94331",
                            "name": "Garlic Bread",
                            "position": 27,
                            "description": "Toasted Garlic Flavored Bread",
                            "images": [],
                            "subitems": [
                              {
                                "id": "224516",
                                "name": "Regular",
                                "position": 1,
                                "price": "130.00",
                                "consumable": "1:1",
                                "cuisine_name": "Indian",
                                "category_name": "Sides",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              },
                              {
                                "id": "224519",
                                "name": "Large",
                                "position": 2,
                                "price": "220.00",
                                "consumable": "1:1",
                                "cuisine_name": "Indian",
                                "category_name": "Sides",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "id": "26585",
                        "name": "Salads",
                        "position": "0",
                        "menuitems": [
                          {
                            "id": "94340",
                            "name": "Portuguese Salad",
                            "position": 28,
                            "description": "Fresh Tomato, Nando&amp;#039;s Peri-Olives, Mixed Peppers, Cucumber and Onion on A Bed of Crisp Lettuce",
                            "images": [],
                            "subitems": [
                              {
                                "id": "224534",
                                "name": "Portuguese Salad",
                                "position": 1,
                                "price": "245.00",
                                "consumable": "1:1",
                                "cuisine_name": "Salad",
                                "category_name": "Salads",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              }
                            ]
                          },
                          {
                            "id": "94343",
                            "name": "Mediterranean Salad",
                            "position": 29,
                            "description": "Piccolo Tomato, Cucumber, Sweet Peppers and Mixed Leaves. Sprinkled with Olives and Feta Cheese",
                            "images": [],
                            "subitems": [
                              {
                                "id": "224537",
                                "name": "Mediterranean Salad",
                                "position": 1,
                                "price": "350.00",
                                "consumable": "1:1",
                                "cuisine_name": "Salad",
                                "category_name": "Salads",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              }
                            ]
                          },
                          {
                            "id": "94346",
                            "name": "Caesar Salad (M)",
                            "position": 30,
                            "description": "Cos Lettuce Sprinkled with Parmesan Cheese, Caesar Dressing and Crunchy Croutons",
                            "images": [],
                            "subitems": [
                              {
                                "id": "224540",
                                "name": "Caesar Salad (M)",
                                "position": 1,
                                "price": "245.00",
                                "consumable": "1:1",
                                "cuisine_name": "Salad",
                                "category_name": "Salads",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "id": "26591",
                        "name": "Try someting new",
                        "position": "0",
                        "menuitems": [
                          {
                            "id": "94376",
                            "name": "Cataplana Algarve",
                            "position": 31,
                            "description": "PERi-PERi Chicken Thighs, Mixed Peppers, Chickpeas, Spicy Rice and Cataplana Sauce",
                            "images": [],
                            "subitems": [
                              {
                                "id": "224612",
                                "name": "Cataplana Algarve",
                                "position": 1,
                                "price": "795.00",
                                "consumable": "1:1",
                                "cuisine_name": "Indian",
                                "category_name": "Try someting new",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "id": "26597",
                        "name": "Burgers, pitas, wraps",
                        "position": "0",
                        "menuitems": [
                          {
                            "id": "94388",
                            "name": "Chicken Wrap (Y)",
                            "position": 32,
                            "description": "A Lightly Toasted Wrap, Generously Filled With Tender Chicken, Chili Jam, Green Leaf Lettuce and Tangy Yoghurt Sauce",
                            "images": [],
                            "subitems": [
                              {
                                "id": "224630",
                                "name": "On its own",
                                "position": 1,
                                "price": "335.00",
                                "consumable": "1:1",
                                "cuisine_name": "Indian",
                                "category_name": "Burgers, pitas, wraps",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              },
                              {
                                "id": "224633",
                                "name": "With 1 Regular Side",
                                "position": 2,
                                "price": "435.00",
                                "consumable": "1:1",
                                "cuisine_name": "Indian",
                                "category_name": "Burgers, pitas, wraps",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              },
                              {
                                "id": "224636",
                                "name": "With 2 Regular Sides",
                                "position": 3,
                                "price": "525.00",
                                "consumable": "1:1",
                                "cuisine_name": "Indian",
                                "category_name": "Burgers, pitas, wraps",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              }
                            ]
                          },
                          {
                            "id": "94391",
                            "name": "Chicken Breast Burger (M)",
                            "position": 33,
                            "description": "Served on A Toasted Portuguese Roll with Fresh Rocket, Tomato, Pickled Red Onions and Perinaise",
                            "images": [],
                            "subitems": [
                              {
                                "id": "224639",
                                "name": "On its own",
                                "position": 1,
                                "price": "335.00",
                                "consumable": "1:1",
                                "cuisine_name": "Burger",
                                "category_name": "Burgers, pitas, wraps",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              },
                              {
                                "id": "224642",
                                "name": "With 1 Regular Side",
                                "position": 2,
                                "price": "435.00",
                                "consumable": "1:1",
                                "cuisine_name": "Burger",
                                "category_name": "Burgers, pitas, wraps",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              },
                              {
                                "id": "224645",
                                "name": "With 2 Regular Sides",
                                "position": 3,
                                "price": "525.00",
                                "consumable": "1:1",
                                "cuisine_name": "Burger",
                                "category_name": "Burgers, pitas, wraps",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              }
                            ]
                          },
                          {
                            "id": "94394",
                            "name": "Chicken Caesar Wrap (M)",
                            "position": 34,
                            "description": "Served in A Toasted Wrap Full Of PERi-PERi Chicken, Crunchy Croutons, Parmesan Cheese and Sundried Tomatoes, All Smothered in Creamy Caesar Dressing",
                            "images": [],
                            "subitems": [
                              {
                                "id": "224648",
                                "name": "On its own",
                                "position": 1,
                                "price": "335.00",
                                "consumable": "1:1",
                                "cuisine_name": "Fast Food",
                                "category_name": "Burgers, pitas, wraps",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              },
                              {
                                "id": "224651",
                                "name": "With 1 Regular Side",
                                "position": 2,
                                "price": "435.00",
                                "consumable": "1:1",
                                "cuisine_name": "Fast Food",
                                "category_name": "Burgers, pitas, wraps",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              },
                              {
                                "id": "224654",
                                "name": "With 2 Regular Sides",
                                "position": 3,
                                "price": "525.00",
                                "consumable": "1:1",
                                "cuisine_name": "Fast Food",
                                "category_name": "Burgers, pitas, wraps",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              }
                            ]
                          },
                          {
                            "id": "94397",
                            "name": "Chicken Pita (M)",
                            "position": 35,
                            "description": "Served in A Lightly Toasted Pita, Stuffed With Chicken Tenders, Crisp Veggie Salad and Creamy Whip",
                            "images": [],
                            "subitems": [
                              {
                                "id": "224657",
                                "name": "On its own",
                                "position": 1,
                                "price": "335.00",
                                "consumable": "1:1",
                                "cuisine_name": "Indian",
                                "category_name": "Burgers, pitas, wraps",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              },
                              {
                                "id": "224660",
                                "name": "With 1 Regular Side",
                                "position": 2,
                                "price": "435.00",
                                "consumable": "1:1",
                                "cuisine_name": "Indian",
                                "category_name": "Burgers, pitas, wraps",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              },
                              {
                                "id": "224663",
                                "name": "With 2 Regular Sides",
                                "position": 3,
                                "price": "525.00",
                                "consumable": "1:1",
                                "cuisine_name": "Indian",
                                "category_name": "Burgers, pitas, wraps",
                                "discount": {
                                  "type": "",
                                  "amount": "0.00"
                                },
                                "tags": []
                              }
                            ]
                          }
                        ]
                      }
                    ]
        }
    }
    render() {
        console.log(this.state.categorys);
        const category = this.state.categorys.map(cat => {
            return(
                <h2>{cat.name}</h2>
            );
        });

         this.state.categorys.map(cat =>{ 
              const menu = cat.menuitems.map(menudata =>{
            return(
                <div className="col-md-6">
                    <div className="card" >
                        <img className="card-img-top" src="https://b.zmtcdn.com/data/pictures/7/18694177/a3f876979c7b1a123ff8d0548d774cb1.jpg?output-format=webp" alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title">{menudata.name}</h5>
                            <p className="card-text">{cat.name}</p>
                            <div className="row">
                                <div className="col-md-6">
                                    <p className="card-text">$7</p>
                                </div>
                                <div className="col-md-6">
                                <a href="#" class="btn btn-success">Add</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
            })
        });
        return (
            <div className ="row">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                        {category}
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                {/* {menu} */}
                            </div>
                        </div>
                        <div className="col-md-3"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RestaurantInfo2;