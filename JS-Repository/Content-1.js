var rep = {
  profile:{
    p1: {
      name: "Niche Modeling General Purposes",
      purposesList:["Geospatial Species-Ocurrences Modelling", "Niche Modelling", "Geospatial Analyses"],
      description: "Datasets conforming to this profile are considered suitable for environmental niche modelling using algorithms such as those based on the principle of maximum entropy (MaxEnt)."},
    p2: {
      name: "National Checklists Purposes",
      purposesList:["National checklist"],
      description: "Basic requirements for creating a natinal checklist of species"}
  },
  ie: {
    ie1:{
      name:"Coordinates", 
      elements:["dwc:DecimalLatitude","dwc:Decimallongitude"],
      descreption:"Represent a spot where an species occurrence was recorded."},
    ie2:{
      name:"Scientific Name", 
      elements:["dwc:ScientificName","dwc:TaxonRank"],
      description: "Represente the most specific (TaxonRank) name (ScientificName) assigned to an individual organism through taxonomic identification."},
    ie3:{
      name:"Latitude", 
      elements:["dwc:DecimalLatitude"]
    },
    ie4:{
      name:"Longitude", 
      elements:["dwc:DecimalLongitude"]},
    ie5:{
      name:"Datum", 
      elements:["dwc:GeodeticDatum"]},
    ie6:{
      name:"Basis of Record",
      elements:["dwc:BasisOfRecord"],
      description: "Represent the nature of the record."},
    ie7:{
      name:"Taxon Identifier",
      elements:["dwc:TaxonID"],
      description: "Represente a unique identifier for a taxon data domain."
    },
    ie8:{
      name:"Location Identifier",
      elements:["dwc:LocationID"],
      description: "Represente a unique identifier for a location data domain."
    }
  },
  dimension:{
    d1: {name:"Completeness",          
         definition: "All values of data are filled",
         reference:"Ge, M., & Helfert, M. (2007). A review of information quality research-develop a research agenda."},
    d2: {name:"Precision",
         defintion:"Resolution or granularity of data."},
    d3: {name:"Representativity",
         defintion: "The degree to which the samples represent the distribution of a specific variable. Measurement of meanigful of samples for being used.",
         reference: "Peterson, S. A., Urquhart, N. S., & Welch, E. B. (1999). Sample Representativeness:  A Must for Reliable Regional Lake Condition Estimates. Environmental Science & Technology, 33(10), 1559–1565. doi:10.1021/es980711l"}
  },
  criteria:{
    c1:{statement:"Basis of record must be wellformed"},
    c2:{statement:"Georeferenced rate of dataset records must be better than 80%"},
    c3:{statement:"At least 75% of records must to have a voucher (preserved specimens)"},
    c4:{statement:"Coordinates must be present and well formed"}
  },
  enhancement:{
    e1:{name:"Recommendation of valids scientific names",
        description:"Recommendation of a set of similars and valids scientific names"},
    e2:{name:"Recommendation of removal or correction of orphan records",
        description:"Recommendation of removal or correction records with referential problems, which are not being used"},
    e3:{name:"Recommendation of removal or correction of duplicated records."}
  },
  contextualizedDimension:{},
  contextualizedCriteria:{},
  contextualizedEnhancement:{},
  resourceType:{
    ds:{name:"Dataset"},
    sr:{name:"Single Record"}
  }
};
var currentProfile = {};
function getCurrentContent(){
  var p = {};
  p.ConceptsRepository = rep;
  p.CurrentProfile = currentProfile;
  return p;
}
function defineCurrentProfile(p) {
  currentProfile.Profile = p;
};
function defineVIE(ies){
  currentProfile.ValuableIEs = ies;
};
function defineAContextualizedDimension(name,description,fundamentalDimension,ie,resourceType){
  return {
    name:name,
    description:description,
    fundamentalDimension:fundamentalDimension,
    ie:ie,
    resourceType:resourceType
  };
}
function defineAContextualizedCriteria(fundamentalCriteria,ie,resourceType){
  return {
    fundamentalCriteria:fundamentalCriteria,
    ie:ie,
    resourceType:resourceType
  };
}
function defineAContextualizedEnhancement(fundamentalEnhancement,ie,resourceType){
  return {
    fundamentalEnhancement:fundamentalEnhancement,
    ie:ie,
    resourceType:resourceType
  };
}
function defineDQMesuarementPolicy(cd){
  currentProfile.MeasurementPolicy = cd; 
}
function defineDQValidationPolicy(cc){
  currentProfile.ValidationPolicy = cc; 
}
function defineDQImprovementPolicy(ce){
  currentProfile.ImprovementPolicy = ce; 
}
function configureContextualizedDimension(){
  var coordCompletenessDataset = defineAContextualizedDimension("Coordinates completeness of the dataset","Proportion of record with both latitude and longitude valid and filled",rep.dimension.d1,rep.ie.ie1,rep.resourceType.ds);
  var coordCompletenessRecord = defineAContextualizedDimension("Coordinates completeness of a record","Both latitude and longitude valid and filled",rep.dimension.d1,rep.ie.ie1,rep.resourceType.sr);
  var coordPrecsionRecord = defineAContextualizedDimension("Coordinates numerical precision of a record","Number of significant digits of coordinates",rep.dimension.d2,rep.ie.ie1,rep.resourceType.sr);       
  var coordPrecisonDataset = defineAContextualizedDimension("Coordinates numerical precision of the dataset","Average of the number of significant digits of coordinates.",rep.dimension.d2,rep.ie.ie1,rep.resourceType.ds);       
  var geographicCoverage1 = defineAContextualizedDimension("Geographic coverage (1 degree)","This dimension measures the number of species for which records are available from a range of 1 degree.",rep.dimension.d3,rep.ie.ie1,rep.resourceType.ds);
  var geographicCoverage05 = defineAContextualizedDimension("Geographic coverage (0.5 degree)","This dimension measures the number of species for which records are available from a range of 0.5 degree.",rep.dimension.d3,rep.ie.ie1,rep.resourceType.ds);
  var geographicCoverage01 = defineAContextualizedDimension("Geographic coverage (0.1 degree)","This dimension measures the number of species for which records are available from a range of 0.1 degree.",rep.dimension.d3,rep.ie.ie1,rep.resourceType.ds);
  var cd = {
    cd1:coordCompletenessDataset,
    cd2:coordCompletenessRecord,
    cd3:coordPrecsionRecord,
    cd4:coordPrecisonDataset,
    cd5:geographicCoverage1,
    cd6:geographicCoverage05,
    cd7:geographicCoverage01
  };
  rep.contextualizedDimension = cd; 
}
function configureContextualizedCriteria(){
  var statement1 = defineAContextualizedCriteria(rep.criteria.c1,rep.ie.ie6,rep.resourceType.sr);
  var statement2 = defineAContextualizedCriteria(rep.criteria.c2,rep.ie.ie1,rep.resourceType.ds);
  var statement3 = defineAContextualizedCriteria(rep.criteria.c3,rep.ie.ie6,rep.resourceType.ds);
  var cc = {
    cc1:statement1,
    cc2:statement2,
    cc3:statement3
  };
  rep.contextualizedCriteria = cc; 
}
function configureContextualizedEnhancement(){
  var recommendNames = defineAContextualizedEnhancement(rep.enhancement.e1,rep.ie.ie2,rep.resourceType.sr);
  var referencialProblemsOfTaxon = defineAContextualizedEnhancement(rep.enhancement.e2,rep.ie.ie7,rep.resourceType.ds);
  var referencialProblemsOfLocation = defineAContextualizedEnhancement(rep.enhancement.e2,rep.ie.ie8,rep.resourceType.ds);
  var ce = {
    ce1:recommendNames,
    ce2:referencialProblemsOfTaxon,
    ce3:referencialProblemsOfLocation
  };
  rep.contextualizedEnhancement = ce; 
}
function defineDQPolicy(){
  currentProfile.DQPolicy = [];
  currentProfile.DQPolicy.push(currentProfile.MeasurementPolicy);
  currentProfile.DQPolicy.push(currentProfile.ValidationPolicy);  
  currentProfile.DQPolicy.push(currentProfile.ImprovementPolicy);  
}

function ProfileInstance(){
  // Check if Repository is ok
  // Check if Contextualized compoenents are ok\
  
  //Add to repostiory a set of contextualized components (check this)
  configureContextualizedDimension(); 
  configureContextualizedCriteria(); 
  configureContextualizedEnhancement(); 
  
  //Define the current profile
  defineCurrentProfile(rep.profile.p1);
  
  //Define a set of Valuable IE for the current profile
  var vie = {Coordinates:rep.ie.ie1,
         ScientificName:rep.ie.ie2,
         BasisOfRecord:rep.ie.ie6};
  defineVIE(vie);  
  
  //Define a DQ Measurement Policy (a set of contextualized dimensions) for measuring DQ in the current profile
  var dqmp = {DatasetCoordCompleteness: rep.contextualizedDimension.cd1,
          RecordCoordCompleteness: rep.contextualizedDimension.cd2,
          RecordCoordPrecision: rep.contextualizedDimension.cd3,
          DatasetCoordPrecision: rep.contextualizedDimension.cd4,
          BiogeographicCoverage1d: rep.contextualizedDimension.cd5,
          BiogeographicCoverage05d:rep.contextualizedDimension.cd6,
          BiogeographicCoverage01d:rep.contextualizedDimension.cd7};
  defineDQMesuarementPolicy(dqmp);
  
  //Define a DQ Validation Policy (a set of contextualized criterias) for validate DQ in the current profile
  var dqvp = {
    Statement1: rep.contextualizedCriteria.cc1,
    Statement2: rep.contextualizedCriteria.cc2,
    Statement3: rep.contextualizedCriteria.cc3};
  defineDQValidationPolicy(dqvp);
  
  //Define a DQ Improvement Policy (a set of contextualized enhancement) for improving DQ in the current profile
  var dqip = {
    NamesCorrectionRecommendation: rep.contextualizedEnhancement.ce1,
    TaxonReferentialProblemCorrectionRecommendation: rep.contextualizedEnhancement.ce2,
    LocationReferentialProblemCorrectionRecommendation: rep.contextualizedEnhancement.ce3};
  defineDQImprovementPolicy(dqip);
  
  //Define a DQ Policy (composition of DQ Measurement, Validation and Improvment policies) for the current profile
  defineDQPolicy();
};

/*function doGet() {
  ProfileInstance();
  return HtmlService
      .createTemplateFromFile('index')
      .evaluate();
}*/