
import React from "react"

import Filters from "./Filters"
import PetBrowser from "./PetBrowser"

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      pets: [],
      filters: {
        type: "all"
      }
    }
  }

  getPets = () => {
    let base = "/api/pets";
    let petType = this.state.filters.type;
    let petsUrl = (petType === "all") ? base : `${base}?type=${petType}`;
    // if (petType !== "all") {
    //   petsUrl += `?type=${petType}`;
    // }

    fetch(petsUrl)
      .then(res => res.json())
      .then(petsData => { this.setState({ pets: petsData }) });
  }

  adoptPet = petId => {
    const filteredPets = this.state.pets.map(pet => {
      return (pet.id === petId) ? { ...pet, isAdopted: true } : pet;
    });
    this.setState({ pets: filteredPets });
  };

  filterPets = e => {
    // let selectedType = e.target.value;
    this.setState({
      filters: {
        ...this.state.filters,
        type: e.target.value
      }
    });
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={e => this.filterPets(e)}
                onFindPetsClick={this.getPets}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser 
                 pets={this.state.pets}
                 onAdoptPet={this.adoptPet}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
