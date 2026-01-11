
function populateHome() {
    console.log("populating home page with sim data", appData.sims);
    $$("#sims_list li:not(.list-group-title)").remove(); // Clear existing sims, keep titles

    // Populate sims
    for (const simId in appData.sims) {
        const sim = appData.sims[simId];
        const simItem = `
      <li class="sim-item" data-sim-id="${sim.id}">
        <a href="#" class="item-link item-content">
         <div class="item-media"><div class="button f7-icons play_trigger">play</div></div>
          <div class="item-inner">
            <div class="item-title-row">
              <div class="item-title">${sim.name}</div>
            </div>
          </div>
        </a>
      </li>
    `;
        $$(simItem).insertAfter('#sims_list li.section_' + sim.type);
    }
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
        // console.log('List item clicked', e);
        if ($$(e.target).hasClass('play_trigger')) {
            return; // Do nothing if the play trigger was clicked
        }

        const simId = $$(this).closest('.sim-item').data('sim-id');
        console.log('EDIT trigger clicked for sim:', simId);
        editSim(simId);
    });


});