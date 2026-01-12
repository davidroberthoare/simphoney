
function populateHome() {
  console.log("populating home page with sim data", appData.sims);
  $$("#sims_list li:not(.list-group-title)").remove(); // Clear existing sims, keep titles

  // Populate sims
  for (const simId in appData.sims) {
    const sim = appData.sims[simId];
    const simItem = `
      <li class="sim-item" data-sim-id="${sim.id}">
        <a href="#" class="item-link item-content">
         <div class="item-media"><div class="f7-icons play_trigger">play</div></div>
          <div class="item-inner">
            <div class="item-title-row">
              <div class="item-title">${sim.name}</div>
            </div>
          </div>
        </a>
      </li>
    `;
    $$(simItem).insertAfter('#sims_list li.list-group-title[data-type="' + sim.type + '"]');
  }
}



// SIM ACTIONS -------------------------------------
// SIM ACTIONS -------------------------------------
// SIM ACTIONS -------------------------------------

function playSim(simId) {
  //use the active one if none specified
  if (typeof simId === 'undefined' || simId === null) {
    simId = appData.currentSim.id;
  }

  const sim = appData.sims[simId];
  if (!sim) {
    console.error('Sim not found:', simId);
    return;
  }
  console.log('Playing sim:', sim);
  // Store current sim to play in a temporary variable or state
  appData.currentSim = sim;

  navigateTo('/' + sim.type + '/');
}

function editSim(simId) {
  const sim = appData.sims[simId];
  if (!sim) {
    console.error('Sim not found for editing:', simId);
    return;
  }
  console.log('Editing sim:', sim);
  // Store current sim to edit in a temporary variable or state
  appData.currentSim = sim;

  navigateTo('/' + sim.type + '_edit/');

}


function createSim(type) {
  console.log('Creating new sim of type:', type);
  // Generate a new sim object with default values
  const newSimId = generateUniqueId();
  const newSim = {
    id: newSimId,
    name: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Sim`,
    type: type,
    // Add other default properties as needed
  };
  // Store current sim to edit in a temporary variable or state
  appData.currentSim = newSim;
  navigateTo('/' + newSim.type + '_edit/');
}


$$(document).on('page:beforein', '.page[data-name="home"]', function (e, page) {
  // console.log('Page beforeIn: ', e);
  console.log('Loading HOME data...');
  populateHome();
})



// code will run on page INIT
$$(document).on('page:init', '.page[data-name="home"]', (e, page) => {
  console.log("Page init: ", page.name);

  // PLAY trigger click handler
  $$("#sims_list").on('click', '.play_trigger', function (e) {
    e.preventDefault();
    e.stopPropagation(); // Prevent triggering the parent li click event  

    const simId = $$(this).closest('.sim-item').data('sim-id');
    console.log('PLAY trigger clicked for sim:', simId);
    playSim(simId);
  });

  // EDIT trigger click handler
  $$("#sims_list").on('click', 'li', function (e) {
    console.log('List item clicked', e, $$(this));
    if ($$(e.target).hasClass('play_trigger')) {
      return; // Do nothing if the play trigger was clicked
    }
    else if ($$(e.target).hasClass('create')) {
      return; // Do nothing if the create trigger was clicked
    }

    // then it's a regular sim item click
    else {
      const simId = $$(this).closest('.sim-item').data('sim-id');
      console.log('EDIT trigger clicked for sim:', simId);
      editSim(simId);

    }
  });


  $$("#sims_list").on('click', 'li div.create', function (e) {
    // console.log("Create new sim clicked", e.target, $$(this).data('type'));
    const type = $$(this).data('type');
    console.log('CREATE type:', type);
    createSim(type);
  });

});