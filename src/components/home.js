import React, { Component } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      searchName: "",
      cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
      selectedQuantities: {}, // tambahkan state untuk menyimpan quantity yang dipilih per item
    };
  }

  bind = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleQuantityChange = (itemId, newQuantity) => {
    this.setState((prevState) => ({
      selectedQuantities: {
        ...prevState.selectedQuantities,
        [itemId]: newQuantity,
      },
    }));
  };

  handleAddToCartWithQuantity = (item) => {
    const existingItemIndex = this.state.cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      const updatedCartItems = [...this.state.cartItems];
      updatedCartItems[existingItemIndex].quantity +=
        this.state.selectedQuantities[item.id] || 1;
      this.setState({ cartItems: updatedCartItems }, () => {
        localStorage.setItem("cartItems", JSON.stringify(this.state.cartItems));
        toast.success(
          `${this.state.selectedQuantities[item.id]} ${
            item.name
          } telah ditambahkan kedalam keranjang`
        );
      });
    } else {
      const updatedItem = {
        ...item,
        quantity: this.state.selectedQuantities[item.id] || 1,
      };
      this.setState(
        {
          cartItems: [...this.state.cartItems, updatedItem],
        },
        () => {
          localStorage.setItem(
            "cartItems",
            JSON.stringify(this.state.cartItems)
          );
          toast.success(
            `${this.state.selectedQuantities[item.id]} ${
              item.name
            } ditambahkan kedalam keranjang`
          );
        }
      );
    }
  };

  getItems = () => {
    let url = "http://172.16.100.39:8000/coffee";

    if (this.state.searchName !== "") {
      url += `?search=${this.state.searchName}`;
    }

    axios
      .get(url)
      .then((response) => {
        this.setState({
          items: response.data.data,
          selectedQuantities: Object.fromEntries(
            response.data.data.map((item) => [item.id, 1])
          ),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getItems();
  }

  render() {
    return (
      <div className="container mx-auto">
        <h1 className="text-3xl text-center my-8 font-semibold">
          Welcome to Coffee Shop
        </h1>
        <div className="flex justify-center my-8">
          <input
            type="text"
            placeholder="Cari berdasarkan menu"
            className="border border-gray-300 rounded-lg px-4 py-2 w-80"
            value={this.state.searchName}
            onChange={(e) => this.setState({ searchName: e.target.value })}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                this.getItems();
              }
            }}
          />
        </div>
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-3 px-32 items-center"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          }}
        >
          {this.state.items.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden mx-auto"
              style={{ width: "300px" }}
            >
              <img
                src={item.image_url}
                alt={item.name}
                className="w-full h-40 object-cover object-center"
              />
              <div className="p-6">
                <p className="text-lg font-semibold">{item.name}</p>
                <p className="text-sm">{item.size}</p>
                <p className="text-sm">Rp. {item.price.toFixed(2)}</p>
                <div className="flex items-center pt-1">
                  <button
                    className="px-2 py-1 bg-blue-500 rounded-l text-white"
                    onClick={() => {
                      const newQuantity = Math.max(
                        1,
                        this.state.selectedQuantities[item.id] - 1
                      );
                      this.handleQuantityChange(item.id, newQuantity);
                    }}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={this.state.selectedQuantities[item.id] || 1}
                    readOnly
                    className="border-none rounded px-2 py-1 text-center w-8 text-sm bg-white"
                  />
                  <button
                    className="px-2 py-1 bg-blue-500 rounded-r text-white"
                    onClick={() => {
                      const newQuantity =
                        (this.state.selectedQuantities[item.id] || 1) + 1;
                      this.handleQuantityChange(item.id, newQuantity);
                    }}
                  >
                    +
                  </button>
                </div>
                <button
                  className="block px-3 py-1 bg-green-500 text-white rounded mt-2"
                  onClick={() => {
                    this.handleAddToCartWithQuantity(item);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default Home;
