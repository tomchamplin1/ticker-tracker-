import React, { useState, useEffect } from "react";

import axios from "axios";

import { Button, Form, Modal, Container } from "react-bootstrap";

const Entries = () => {
  const [entries, setEntries] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const [changeEntry, setChangeEntry] = useState(false);
  const [changeId, setChangeId] = useState("");
  const [changeIngredient, setChangeIngredient] = useState({
    change: false,
    id: 0,
  });
  const [newIngredientName, setNewIngredientName] = useState("");
  const [addNewEntry, setAddNewEntry] = useState(false);
  const [newEntry, setNewEntry] = useState({
    stockid: "",
    name: "",
    price: "",
    company: "",
  });

  useEffect(() => {
    getAllEntries();
  }, []);

  if (refreshData) {
    setRefreshData(false);
    getAllEntries();
  }

  return (
    <div>
      <div className="p-5 overflow-x-auto relative">
        <div class="overflow-x-auto relative">
          <table class="w-3/4 m-auto text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-200 ">
              <tr>
                <th scope="col" class="py-3 px-6">
                  STOCK
                </th>
                <th scope="col" class="py-3 px-6">
                  PRICE
                </th>
                <th scope="col" class="py-3 px-6">
                  TICKER
                </th>
                <th></th>
              </tr>
            </thead>
            {entries != null &&
              entries.map((entry, i) => (
                <tbody>
                  <tr class="bg-white border">
                    <th
                      scope="row"
                      class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {entry.name}
                    </th>
                    <td class="py-4 px-6"> ${entry.price}</td>
                    <td class="py-4 px-6"> {entry.company}</td>
                    <td class="py-4 px-6">
                      <button
                        onClick={() => {
                          setChangeEntry(true);
                          setChangeId(entry.stockid);
                          console.log(changeId);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="mr-2 bi bi-pencil"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                        </svg>
                      </button>
                      <button onClick={() => deleteSingleEntry(entry.stockid)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-trash"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                          <path
                            fill-rule="evenodd"
                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                  <Modal
                    show={changeEntry}
                    onHide={() => setChangeEntry(false)}
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Edit Stock</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form.Group>
                        <div>
                          <label
                            for="name"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Name
                          </label>
                          <input
                            onChange={(event) => {
                              newEntry.name = event.target.value;
                            }}
                            type="name"
                            name="name"
                            id="name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="AMZN"
                            required
                          />
                        </div>
                        <div>
                          <label
                            for="name"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Price
                          </label>
                          <input
                            onChange={(event) => {
                              newEntry.price = event.target.value;
                            }}
                            type="number"
                            name="price"
                            id="price"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="$200"
                            required
                          />
                        </div>
                        <div>
                          <label
                            for="name"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Company
                          </label>
                          <input
                            onChange={(event) => {
                              newEntry.company = event.target.value;
                            }}
                            name="company"
                            id="company"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Amazon"
                            required
                          />
                        </div>
                      </Form.Group>
                      <button
                        onClick={() => changeSingleEntry(changeId)}
                        type="submit"
                        class="mt-3 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Edit Stock
                      </button>
                      <button
                        onClick={() => setChangeEntry(false)}
                        type="submit"
                        class="mt-3 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Cancel
                      </button>
                    </Modal.Body>
                  </Modal>
                </tbody>
              ))}
            <button
              class="mt-2 block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 text-center"
              type="button"
              data-modal-toggle="authentication-modal"
              onClick={() => setAddNewEntry(true)}
            >
              Add +
            </button>
          </table>

          <Modal
            show={addNewEntry}
            onHide={() => setAddNewEntry(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Add Stock</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <div>
                  <label
                    for="name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    onChange={(event) => {
                      newEntry.name = event.target.value;
                    }}
                    type="name"
                    name="name"
                    id="name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="AMZN"
                    required
                  />
                </div>
                <div>
                  <label
                    for="name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Price
                  </label>
                  <input
                    onChange={(event) => {
                      newEntry.price = event.target.value;
                    }}
                    type="number"
                    name="price"
                    id="price"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="$200"
                    required
                  />
                </div>
                <div>
                  <label
                    for="name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Company
                  </label>
                  <input
                    onChange={(event) => {
                      newEntry.company = event.target.value;
                    }}
                    name="company"
                    id="company"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Amazon"
                    required
                  />
                </div>
              </Form.Group>
              <button
                onClick={() => addSingleEntry()}
                type="submit"
                class="mt-3 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add Stock
              </button>
              <button
                onClick={() => setAddNewEntry(false)}
                type="submit"
                class="mt-3 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Cancel
              </button>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );

  function changeIngredientForEntry() {
    changeIngredient.change = false;
    var url = "http://localhost:8080/ingredient/update/" + changeIngredient.id;
    axios
      .put(url, {
        ingredients: newIngredientName,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setRefreshData(true);
        }
      });
  }

  function changeSingleEntry(changeId) {
    setChangeEntry(false);
    var url = "http://localhost:8080/api/stock/" + changeId;
    axios
      .put(url, {
        name: newEntry.name,
        price: parseFloat(newEntry.price),
        company: newEntry.company,
      })
      .then((response) => {
        if (response.status === 200) {
          setRefreshData(true);
          setChangeId("");
        }
      });
  }

  function addSingleEntry() {
    setAddNewEntry(false);
    var url = "http://localhost:8080/api/newstock";
    axios
      .post(url, {
        name: newEntry.name,
        price: parseFloat(newEntry.price),
        company: newEntry.company,
      })
      .then((response) => {
        if (response.status === 200) {
          setRefreshData(true);
        }
      });
  }

  function deleteSingleEntry(id) {
    var url = "http://localhost:8080/api/deletestock/" + id;
    axios.delete(url, {}).then((response) => {
      if (response.status === 200) {
        setRefreshData(true);
        console.log("Successfully deleted entry " + id);
      }
    });
  }

  function getAllEntries() {
    var url = "http://localhost:8080/api/stock";
    axios
      .get(url, {
        responseType: "json",
      })
      .then((response) => {
        if (response.status === 200) {
          var entryList = response.data;
          setEntries(entryList.sort((a, b) => a[1] - b[1]));
          console.log(entryList);
        }
      });
  }
};

export default Entries;
