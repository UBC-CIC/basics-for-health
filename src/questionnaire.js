export const FhirQ = {
    "status": "draft",
    "name": "b4h-questionnaire",
    "title": "SOCIAL CARE PROFILE",
    "resourceType": "Questionnaire",
    "meta": {
      "profile": [
        "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire|2.7"
      ],
      "tag": [
        {
          "code": "lformsVersion: 29.2.1"
        }
      ]
    },
    "item": [
      {
        "type": "group",
        "linkId": "1",
        "text": "IDENTITY",
        "item": [
          {
            "type": "group",
            "required": false,
            "linkId": "1.1",
            "text": "Questions & Prompts",
            "item": [
              {
                "type": "text",
                "required": false,
                "linkId": "1.1.1",
                "text": "Tell me about yourself."
              },
              {
                "code": [
                  {
                    "system": "http://loinc.org",
                    "code": "78746-5",
                    "display": "Country of birth"
                  }
                ],
                "text": "Where were you born?",
                "type": "string",
                "linkId": "3716356158372",
                "answerOption": [
                  {
                    "valueCoding": {
                      "system": "http://loinc.org"
                    }
                  }
                ]
              },
              {
                "type": "string",
                "required": false,
                "linkId": "1.1.3",
                "text": "Where did you grow up?"
              },
              {
                "type": "choice",
                "extension": [
                  {
                    "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
                    "valueCodeableConcept": {
                      "coding": [
                        {
                          "system": "http://hl7.org/fhir/questionnaire-item-control",
                          "code": "radio-button",
                          "display": "Radio Button"
                        }
                      ],
                      "text": "Radio Button"
                    }
                  }
                ],
                "required": false,
                "linkId": "1.1.4",
                "text": "Do you identify as a POC?",
                "item": [
                  {
                    "code": [
                      {
                        "system": "http://loinc.org",
                        "code": "59362-4",
                        "display": "Race/Ethnicity"
                      }
                    ],
                    "text": "What is your background?",
                    "answerOption": [
                      {
                        "valueCoding": {
                          "code": "LA6155-1",
                          "system": "http://loinc.org"
                        }
                      },
                      {
                        "valueCoding": {
                          "code": "LA6156-9",
                          "system": "http://loinc.org"
                        }
                      },
                      {
                        "valueCoding": {
                          "code": "LA10610-6",
                          "system": "http://loinc.org"
                        }
                      },
                      {
                        "valueCoding": {
                          "code": "LA6214-6",
                          "system": "http://loinc.org"
                        }
                      },
                      {
                        "valueCoding": {
                          "code": "LA10611-4",
                          "system": "http://loinc.org"
                        }
                      },
                      {
                        "valueCoding": {
                          "code": "LA4457-3",
                          "system": "http://loinc.org"
                        }
                      }
                    ],
                    "type": "string",
                    "linkId": "5731863039306",
                    "enableWhen": [
                      {
                        "question": "1.1.4",
                        "operator": "=",
                        "answerCoding": {
                          "code": "y",
                          "display": "Yes"
                        }
                      }
                    ],
                    "enableBehavior": "all"
                  }
                ],
                "answerOption": [
                  {
                    "valueCoding": {
                      "code": "y",
                      "display": "Yes"
                    }
                  },
                  {
                    "valueCoding": {
                      "code": "n",
                      "display": "No"
                    }
                  }
                ]
              },
              {
                "type": "choice",
                "extension": [
                  {
                    "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
                    "valueCodeableConcept": {
                      "coding": [
                        {
                          "system": "http://hl7.org/fhir/questionnaire-item-control",
                          "code": "radio-button",
                          "display": "Radio Button"
                        }
                      ],
                      "text": "Radio Button"
                    }
                  }
                ],
                "required": false,
                "linkId": "1.1.5",
                "text": "Do you have any aboriginal or indigenous heritage?",
                "answerOption": [
                  {
                    "valueCoding": {
                      "code": "y2",
                      "display": "Yes"
                    }
                  },
                  {
                    "valueCoding": {
                      "code": "n2",
                      "display": "No"
                    }
                  }
                ]
              },
              {
                "code": [
                  {
                    "system": "http://loinc.org",
                    "code": "54899-0",
                    "display": "Preferred Language"
                  }
                ],
                "text": "What language are you most comfortable speaking in?",
                "answerOption": [
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA43-5",
                      "display": "English"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA44-3",
                      "display": "Spanish"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA4168-6",
                      "display": "Chinese"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA46-8",
                      "display": "Other"
                    }
                  }
                ],
                "type": "choice",
                "linkId": "7418657094466",
                "item": [
                  {
                    "text": "What is it?",
                    "linkId": "1965760916173",
                    "type": "string",
                    "enableWhen": [
                      {
                        "question": "7418657094466",
                        "operator": "=",
                        "answerCoding": {
                          "system": "http://loinc.org",
                          "code": "LA46-8",
                          "display": "Other"
                        }
                      }
                    ]
                  }
                ]
              },
              {
                "type": "choice",
                "extension": [
                  {
                    "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
                    "valueCodeableConcept": {
                      "coding": [
                        {
                          "system": "http://hl7.org/fhir/questionnaire-item-control",
                          "code": "radio-button",
                          "display": "Radio Button"
                        }
                      ],
                      "text": "Radio Button"
                    }
                  }
                ],
                "required": false,
                "linkId": "1.1.7",
                "text": "Is faith or spirituality a big part of your life?",
                "answerOption": [
                  {
                    "valueCoding": {
                      "code": "y3",
                      "display": "Yes"
                    }
                  },
                  {
                    "valueCoding": {
                      "code": "n3",
                      "display": "No"
                    }
                  }
                ]
              },
              {
                "code": [
                  {
                    "system": "http://loinc.org",
                    "code": "76690-7",
                    "display": "Sexual orientation"
                  }
                ],
                "text": "How do you identify in terms of sexual orientation?",
                "answerOption": [
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA22877-7",
                      "display": "Bisexual"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA22876-9",
                      "display": "Heterosexual"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA22875-1",
                      "display": "Homosexual"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA46-8",
                      "display": "Other"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA20384-6",
                      "display": "Asked but unknown"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA4489-6",
                      "display": "Unknown"
                    }
                  }
                ],
                "type": "choice",
                "linkId": "8450499607582"
              },
              {
                "code": [
                  {
                    "system": "http://loinc.org",
                    "code": "90778-2",
                    "display": "Personal pronoun Reported"
                  }
                ],
                "text": "What gender pronouns do you prefer?",
                "answerOption": [
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA29518-0",
                      "display": "he/him/his/his/himself"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA29519-8",
                      "display": "she/her/her/hers/herself"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA29520-6",
                      "display": "they/them/their/theirs/themselves"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA29523-0",
                      "display": "ze/zir/zir/zirs/zirself"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA29521-4",
                      "display": "xie/hir (\"here\")/hir/hirs/hirself"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA29515-6",
                      "display": "co/co/cos/cos/coself"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA29516-4",
                      "display": "en/en/ens/ens/enself"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA29517-2",
                      "display": "ey/em/eir/eirs/emself"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA29522-2",
                      "display": "yo/yo/yos/yos/yoself"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA29524-8",
                      "display": "ve/vis/ver/ver/verself"
                    }
                  }
                ],
                "type": "choice",
                "linkId": "5297621405400"
              }
            ]
          },
          {
            "type": "group",
            "required": false,
            "linkId": "1.2",
            "text": "Social Health Factors",
            "item": [
              {
                "type": "boolean",
                "required": false,
                "linkId": "1.2.1",
                "text": "Immigrant"
              },
              {
                "type": "boolean",
                "required": false,
                "linkId": "1.2.2",
                "text": "Refugee"
              },
              {
                "type": "boolean",
                "required": false,
                "linkId": "1.2.3",
                "text": "Indigenous"
              },
              {
                "type": "boolean",
                "required": false,
                "linkId": "1.2.4",
                "text": "POC"
              },
              {
                "code": [
                  {
                    "system": "http://loinc.org",
                    "code": "90778-2",
                    "display": "Personal pronoun Reported"
                  }
                ],
                "text": "Preferred Pronouns",
                "answerOption": [
                  {
                    "valueCoding": {
                      "code": "LA29518-0",
                      "system": "http://loinc.org"
                    }
                  },
                  {
                    "valueCoding": {
                      "code": "LA29519-8",
                      "system": "http://loinc.org"
                    }
                  },
                  {
                    "valueCoding": {
                      "code": "LA29520-6",
                      "system": "http://loinc.org"
                    }
                  },
                  {
                    "valueCoding": {
                      "code": "LA29523-0",
                      "system": "http://loinc.org"
                    }
                  },
                  {
                    "valueCoding": {
                      "code": "LA29521-4",
                      "system": "http://loinc.org"
                    }
                  },
                  {
                    "valueCoding": {
                      "code": "LA29515-6",
                      "system": "http://loinc.org"
                    }
                  },
                  {
                    "valueCoding": {
                      "code": "LA29516-4",
                      "system": "http://loinc.org"
                    }
                  },
                  {
                    "valueCoding": {
                      "code": "LA29517-2",
                      "system": "http://loinc.org"
                    }
                  },
                  {
                    "valueCoding": {
                      "code": "LA29522-2",
                      "system": "http://loinc.org"
                    }
                  },
                  {
                    "valueCoding": {
                      "code": "LA29524-8",
                      "system": "http://loinc.org"
                    }
                  }
                ],
                "type": "string",
                "linkId": "8339743082049"
              },
              {
                "type": "boolean",
                "required": false,
                "linkId": "1.2.6",
                "text": "Religion",
                "item": [
                  {
                    "text": "?",
                    "linkId": "4666184778419",
                    "type": "string",
                    "enableWhen": [
                      {
                        "question": "1.2.6",
                        "operator": "=",
                        "answerBoolean": true
                      }
                    ],
                    "_text": {
                      "extension": [
                        {
                          "url": "http://hl7.org/fhir/StructureDefinition/rendering-style",
                          "valueString": "visibility: hidden;"
                        }
                      ]
                    }
                  }
                ]
              },
              {
                "text": "Other",
                "linkId": "9178754827299",
                "type": "text"
              }
            ]
          },
          {
            "text": "Potential Interventions",
            "linkId": "2952570338080",
            "type": "group",
            "item": [
              {
                "text": "ID clinics",
                "linkId": "4633114237085",
                "type": "text"
              },
              {
                "text": "Professional interpretation",
                "linkId": "7831095946577",
                "type": "text"
              },
              {
                "text": "ESL classes and settlement services",
                "linkId": "4231847156286",
                "type": "text"
              },
              {
                "text": "Indigenous services",
                "linkId": "7244309349591",
                "type": "text"
              },
              {
                "text": "Culturally-specific services",
                "linkId": "8054371567256",
                "type": "text"
              },
              {
                "text": "LGBTQ services",
                "linkId": "8983951690792",
                "type": "text"
              },
              {
                "text": "Youth services",
                "linkId": "6249277592124",
                "type": "text"
              },
              {
                "text": "Immigration/Refugee support services",
                "linkId": "8128199581171",
                "type": "text"
              }
            ]
          },
          {
            "text": "Actions & Monitoring",
            "linkId": "4243920284204",
            "type": "group",
            "item": [
              {
                "text": "Date:",
                "linkId": "9524950091735",
                "type": "date"
              },
              {
                "text": "Results",
                "linkId": "9453862023784",
                "type": "text"
              },
              {
                "text": "Date:",
                "linkId": "1662163086855",
                "type": "date"
              },
              {
                "text": "Result:",
                "linkId": "3793255164359",
                "type": "text"
              },
              {
                "text": "Follow-up",
                "linkId": "3007747973680",
                "type": "boolean",
                "item": [
                  {
                    "text": "?",
                    "linkId": "2469135980765",
                    "type": "string",
                    "_text": {
                      "extension": [
                        {
                          "url": "http://hl7.org/fhir/StructureDefinition/rendering-style",
                          "valueString": "visibility: hidden;"
                        }
                      ]
                    },
                    "enableWhen": [
                      {
                        "question": "3007747973680",
                        "operator": "=",
                        "answerBoolean": true
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ],
        "_text": {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/rendering-style",
              "valueString": "font-weight: bold;"
            }
          ]
        }
      },
      {
        "type": "group",
        "linkId": "2",
        "text": "FAMILY & FRIENDS",
        "item": [
          {
            "text": "Questions & Prompts",
            "linkId": "9658908703736",
            "type": "group",
            "item": [
              {
                "text": "Are there people in your life you can count on for support?",
                "linkId": "2566942733848",
                "type": "text"
              },
              {
                "code": [
                  {
                    "system": "http://loinc.org",
                    "code": "46468-5",
                    "display": "Current living arrangement"
                  }
                ],
                "text": "Who lives with you at home?",
                "answerOption": [
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA6255-9",
                      "display": "Lives alone"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA6450-6",
                      "display": "With spouse or significant other"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA6447-2",
                      "display": "With other family member"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA6444-9",
                      "display": "With a friend"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA6449-8",
                      "display": "With paid help (other than home care agency staff)"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA6448-0",
                      "display": "With other than above"
                    }
                  }
                ],
                "type": "choice",
                "linkId": "4892100848919"
              },
              {
                "text": "Do you have children?",
                "linkId": "7813170329956",
                "type": "choice",
                "extension": [
                  {
                    "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
                    "valueCodeableConcept": {
                      "coding": [
                        {
                          "system": "http://hl7.org/fhir/questionnaire-item-control",
                          "code": "radio-button",
                          "display": "Radio Button"
                        }
                      ],
                      "text": "Radio Button"
                    }
                  }
                ],
                "item": [
                  {
                    "text": "Do you have access to adequate childcare?",
                    "linkId": "9983246178933",
                    "type": "choice",
                    "extension": [
                      {
                        "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
                        "valueCodeableConcept": {
                          "coding": [
                            {
                              "system": "http://hl7.org/fhir/questionnaire-item-control",
                              "code": "radio-button",
                              "display": "Radio Button"
                            }
                          ],
                          "text": "Radio Button"
                        }
                      }
                    ],
                    "enableWhen": [
                      {
                        "question": "7813170329956",
                        "operator": "=",
                        "answerCoding": {
                          "code": "y4",
                          "display": "Yes"
                        }
                      }
                    ],
                    "answerOption": [
                      {
                        "valueCoding": {
                          "code": "y5",
                          "display": "Yes"
                        }
                      },
                      {
                        "valueCoding": {
                          "code": "n5",
                          "display": "No"
                        }
                      }
                    ]
                  },
                  {
                    "text": "Who helps you with child care?",
                    "linkId": "5037028950926",
                    "type": "string",
                    "enableWhen": [
                      {
                        "question": "7813170329956",
                        "operator": "=",
                        "answerCoding": {
                          "code": "y4",
                          "display": "Yes"
                        }
                      }
                    ]
                  }
                ],
                "answerOption": [
                  {
                    "valueCoding": {
                      "code": "y4",
                      "display": "Yes"
                    }
                  },
                  {
                    "valueCoding": {
                      "code": "n4",
                      "display": "No"
                    }
                  }
                ]
              },
              {
                "text": "What is your relationship like with your family?",
                "linkId": "1613821995493",
                "type": "text"
              },
              {
                "text": "Are you currently in a relationship?",
                "linkId": "2396925368585",
                "type": "choice",
                "extension": [
                  {
                    "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
                    "valueCodeableConcept": {
                      "coding": [
                        {
                          "system": "http://hl7.org/fhir/questionnaire-item-control",
                          "code": "radio-button",
                          "display": "Radio Button"
                        }
                      ],
                      "text": "Radio Button"
                    }
                  }
                ],
                "answerOption": [
                  {
                    "valueCoding": {
                      "code": "y6",
                      "display": "Yes"
                    }
                  },
                  {
                    "valueCoding": {
                      "code": "n6",
                      "display": "No"
                    }
                  }
                ]
              },
              {
                "text": "Tell me about your past relationships.",
                "linkId": "5881988233460",
                "type": "text"
              },
              {
                "text": "Do you have a case manager or worker?",
                "linkId": "3471634472963",
                "type": "choice",
                "extension": [
                  {
                    "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
                    "valueCodeableConcept": {
                      "coding": [
                        {
                          "system": "http://hl7.org/fhir/questionnaire-item-control",
                          "code": "radio-button",
                          "display": "Radio Button"
                        }
                      ],
                      "text": "Radio Button"
                    }
                  }
                ],
                "answerOption": [
                  {
                    "valueCoding": {
                      "code": "y7",
                      "display": "Yes"
                    }
                  },
                  {
                    "valueCoding": {
                      "code": "n7",
                      "display": "No"
                    }
                  }
                ]
              }
            ]
          },
          {
            "text": "Social Health Factors",
            "linkId": "6216843209775",
            "type": "group",
            "item": [
              {
                "text": "Factor 1",
                "linkId": "6879894816380",
                "type": "boolean"
              },
              {
                "text": "Factor 2",
                "linkId": "4089976359505",
                "type": "boolean"
              },
              {
                "text": "Factor 3",
                "linkId": "4245835494569",
                "type": "boolean"
              },
              {
                "text": "Factor 4",
                "linkId": "1320322773504",
                "type": "boolean",
                "repeats": false
              },
              {
                "text": "Other",
                "linkId": "3280883523934",
                "type": "text"
              }
            ]
          },
          {
            "text": "Potential Interventions",
            "linkId": "6486721184714",
            "type": "group",
            "item": [
              {
                "text": "Case management referral or connecting with existing case manager",
                "linkId": "387453545206",
                "type": "text"
              },
              {
                "text": "Early years or parenting centre drop-ins",
                "linkId": "3416873699069",
                "type": "text"
              },
              {
                "text": "Community drop-in centres/hobby groups",
                "linkId": "1168293882893",
                "type": "text"
              },
              {
                "text": "Parenting Groups",
                "linkId": "3505402189431",
                "type": "text"
              },
              {
                "text": "Potential identification of trauma or safety issues",
                "linkId": "8377141271968",
                "type": "text"
              }
            ]
          },
          {
            "text": "Actions & Monitoring",
            "linkId": "3042231204472",
            "type": "group",
            "item": [
              {
                "text": "Date:",
                "linkId": "8411040307858",
                "type": "date"
              },
              {
                "text": "Result:",
                "linkId": "3367529661227",
                "type": "text"
              },
              {
                "text": "Date:",
                "linkId": "9541250879631",
                "type": "date"
              },
              {
                "text": "Result:",
                "linkId": "565060997747",
                "type": "text"
              },
              {
                "text": "Follow-up",
                "linkId": "8102992572290",
                "type": "boolean",
                "item": [
                  {
                    "text": "New item 5",
                    "linkId": "365898304828",
                    "type": "string",
                    "enableWhen": [
                      {
                        "question": "8102992572290",
                        "operator": "=",
                        "answerBoolean": true
                      }
                    ],
                    "_text": {
                      "extension": [
                        {
                          "url": "http://hl7.org/fhir/StructureDefinition/rendering-style",
                          "valueString": "visibility: hidden;"
                        }
                      ]
                    }
                  }
                ]
              }
            ]
          }
        ],
        "_text": {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/rendering-style",
              "valueString": "font-weight: bold;"
            }
          ]
        }
      },
      {
        "text": "INCOME",
        "linkId": "5778789094087",
        "type": "group",
        "item": [
          {
            "text": "Questions & Prompts",
            "linkId": "9194316015161",
            "type": "group",
            "item": [
              {
                "code": [
                  {
                    "system": "http://loinc.org",
                    "code": "76513-1",
                    "display": "How hard is it for you to pay for the very basics like food, housing, medical care, and heating?"
                  }
                ],
                "text": "How hard is it for you to make ends meet at the end of the month?",
                "answerOption": [
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA15832-1",
                      "display": "Very hard"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA14745-6",
                      "display": "Hard"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA22683-9",
                      "display": "Somewhat hard"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA22682-1",
                      "display": "Not very hard"
                    }
                  }
                ],
                "type": "choice",
                "linkId": "6272124477852"
              },
              {
                "text": "What are your current sources of income?",
                "linkId": "9620558596442",
                "type": "string",
                "repeats": false
              },
              {
                "text": "Do you ever run out of money to buy food?",
                "linkId": "8234945687173",
                "type": "choice",
                "extension": [
                  {
                    "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
                    "valueCodeableConcept": {
                      "coding": [
                        {
                          "system": "http://hl7.org/fhir/questionnaire-item-control",
                          "code": "radio-button",
                          "display": "Radio Button"
                        }
                      ],
                      "text": "Radio Button"
                    }
                  }
                ],
                "answerOption": [
                  {
                    "valueCoding": {
                      "code": "y9",
                      "display": "Yes"
                    }
                  },
                  {
                    "valueCoding": {
                      "code": "n9",
                      "display": "No"
                    }
                  }
                ]
              },
              {
                "text": "Do you have trouble paying for public transportation?",
                "linkId": "281292865105",
                "type": "choice",
                "extension": [
                  {
                    "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
                    "valueCodeableConcept": {
                      "coding": [
                        {
                          "system": "http://hl7.org/fhir/questionnaire-item-control",
                          "code": "radio-button",
                          "display": "Radio Button"
                        }
                      ],
                      "text": "Radio Button"
                    }
                  }
                ],
                "answerOption": [
                  {
                    "valueCoding": {
                      "code": "y10",
                      "display": "Yes"
                    }
                  },
                  {
                    "valueCoding": {
                      "code": "n10",
                      "display": "No"
                    }
                  }
                ]
              },
              {
                "text": "Do you have access to a phone or a place to leave messages?",
                "linkId": "3534466699315",
                "type": "choice",
                "extension": [
                  {
                    "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
                    "valueCodeableConcept": {
                      "coding": [
                        {
                          "system": "http://hl7.org/fhir/questionnaire-item-control",
                          "code": "radio-button",
                          "display": "Radio Button"
                        }
                      ],
                      "text": "Radio Button"
                    }
                  }
                ],
                "answerOption": [
                  {
                    "valueCoding": {
                      "code": "y11",
                      "display": "Yes"
                    }
                  },
                  {
                    "valueCoding": {
                      "code": "n11",
                      "display": "No"
                    }
                  }
                ]
              }
            ]
          },
          {
            "text": "Social Health Factors",
            "linkId": "823662733731",
            "type": "group",
            "item": [
              {
                "text": "Factor 1",
                "linkId": "6279971048531",
                "type": "boolean"
              },
              {
                "text": "Factor 2",
                "linkId": "7200552928",
                "type": "boolean"
              },
              {
                "text": "Factor 3",
                "linkId": "5580558072117",
                "type": "boolean"
              },
              {
                "text": "Factor 4",
                "linkId": "3503817821527",
                "type": "boolean"
              },
              {
                "text": "Other",
                "linkId": "8554218715216",
                "type": "text"
              }
            ]
          },
          {
            "text": "Potential Interventions",
            "linkId": "2525937504894",
            "type": "group",
            "item": [
              {
                "text": "Poverty Tool to find benefits",
                "linkId": "6065689319661",
                "type": "text",
                "item": [
                  {
                    "text": "https://www.cfpc.ca/CFPC/media/Resources/Poverty/Poverty_flowBC-2016-Oct-31.pdf",
                    "type": "display",
                    "linkId": "6065689319661_helpText",
                    "extension": [
                      {
                        "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
                        "valueCodeableConcept": {
                          "text": "Help-Button",
                          "coding": [
                            {
                              "code": "help",
                              "display": "Help-Button",
                              "system": "http://hl7.org/fhir/questionnaire-item-control"
                            }
                          ]
                        }
                      }
                    ]
                  }
                ]
              },
              {
                "text": "Assistance with income benefits forms",
                "linkId": "1929971277500",
                "type": "text"
              },
              {
                "text": "Suggesting filing income taxes",
                "linkId": "3600467237091",
                "type": "text"
              },
              {
                "text": "Referral to food banks or meal programs",
                "linkId": "3707238695768",
                "type": "text"
              },
              {
                "text": "Completing transportation forms/letter",
                "linkId": "5779078657076",
                "type": "text"
              }
            ]
          },
          {
            "text": "Actions & Monitoring",
            "linkId": "9832067956354",
            "type": "group",
            "item": [
              {
                "text": "Date:",
                "linkId": "2185375252560",
                "type": "date"
              },
              {
                "text": "Result:",
                "linkId": "6887637411793",
                "type": "text"
              },
              {
                "text": "Date:",
                "linkId": "6232727825657",
                "type": "date"
              },
              {
                "text": "Result:",
                "linkId": "3741990962081",
                "type": "text"
              },
              {
                "text": "Follow-up",
                "linkId": "909003261430",
                "type": "boolean",
                "item": [
                  {
                    "text": "New item 7",
                    "linkId": "4997082635642",
                    "type": "string",
                    "_text": {
                      "extension": [
                        {
                          "url": "http://hl7.org/fhir/StructureDefinition/rendering-style",
                          "valueString": "visibility: hidden;"
                        }
                      ]
                    },
                    "enableWhen": [
                      {
                        "question": "909003261430",
                        "operator": "=",
                        "answerBoolean": true
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ],
        "_text": {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/rendering-style",
              "valueString": "font-weight: bold;"
            }
          ]
        }
      },
      {
        "text": "TRAUMA",
        "linkId": "7906515884602",
        "type": "group",
        "item": [
          {
            "text": "Questions & Prompts",
            "linkId": "3995150455478",
            "type": "group",
            "item": [
              {
                "text": "Have you had any significant, negative or overwhelming experiences in your life that have left a lasting emotional impact on you?",
                "linkId": "8828264121526",
                "type": "text"
              },
              {
                "text": "Have you experienced or witnessed violence that left a lasting impact on you?",
                "linkId": "3720946338342",
                "type": "text"
              }
            ]
          },
          {
            "text": "Social Health Factors",
            "linkId": "9163859541265",
            "type": "group",
            "item": [
              {
                "text": "Factor 1",
                "linkId": "3254024032724",
                "type": "boolean"
              },
              {
                "text": "Factor 2",
                "linkId": "1946995197645",
                "type": "boolean"
              },
              {
                "text": "Factor 3",
                "linkId": "2106729872035",
                "type": "boolean"
              },
              {
                "text": "Factor 4",
                "linkId": "4173370147892",
                "type": "boolean"
              },
              {
                "text": "Other",
                "linkId": "7136754236777",
                "type": "text"
              }
            ]
          },
          {
            "text": "Potential Interventions",
            "linkId": "327076084562",
            "type": "group",
            "item": [
              {
                "text": "Using a trauma-informed approach - communicating safety",
                "linkId": "6580051888245",
                "type": "text"
              },
              {
                "text": "Counselling or trauma therapy",
                "linkId": "3338968232486",
                "type": "text"
              },
              {
                "text": "Assessing mental health and safety",
                "linkId": "2952964249010",
                "type": "text"
              },
              {
                "text": "Understanding a patient’s health risks based on Adverse Childhood Experiences",
                "linkId": "8428187891802",
                "type": "text"
              }
            ]
          },
          {
            "text": "Actions & Monitoring",
            "linkId": "3561709421230",
            "type": "group",
            "item": [
              {
                "text": "Date:",
                "linkId": "4085952093405",
                "type": "date"
              },
              {
                "text": "Result:",
                "linkId": "6307904113603",
                "type": "text"
              },
              {
                "text": "Date:",
                "linkId": "362613126696",
                "type": "date"
              },
              {
                "text": "Result:",
                "linkId": "2008941588701",
                "type": "text"
              },
              {
                "text": "Follow-up",
                "linkId": "8516448163902",
                "type": "boolean",
                "item": [
                  {
                    "text": "New item 9",
                    "linkId": "3351749272267",
                    "type": "string",
                    "_text": {
                      "extension": [
                        {
                          "url": "http://hl7.org/fhir/StructureDefinition/rendering-style",
                          "valueString": "visibility: hidden;"
                        }
                      ]
                    },
                    "enableWhen": [
                      {
                        "question": "8516448163902",
                        "operator": "=",
                        "answerBoolean": true
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ],
        "_text": {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/rendering-style",
              "valueString": "font-weight: bold;"
            }
          ]
        }
      },
      {
        "text": "HOUSING",
        "linkId": "1471097710126",
        "type": "group",
        "_text": {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/rendering-style",
              "valueString": "font-weight: bold;"
            }
          ]
        },
        "item": [
          {
            "text": "Questions & Prompts",
            "linkId": "5391166843463",
            "type": "group",
            "item": [
              {
                "code": [
                  {
                    "system": "http://loinc.org",
                    "code": "46526-0",
                    "display": "Current residence"
                  }
                ],
                "text": "Where are you staying right now?",
                "answerOption": [
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA6344-1",
                      "display": "Patient's owned or rented residence"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA6198-1",
                      "display": "Family member's residence"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA6164-3",
                      "display": "Boarding home or rented room"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA6163-5",
                      "display": "Board and care or assisted living facility"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA46-8",
                      "display": "Other"
                    }
                  }
                ],
                "type": "choice",
                "linkId": "4952860105187"
              },
              {
                "text": "When did you last have a stable place to stay?",
                "linkId": "5803434489944",
                "type": "string"
              },
              {
                "text": "Do you need help finding housing?",
                "linkId": "2520619851986",
                "type": "choice",
                "extension": [
                  {
                    "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
                    "valueCodeableConcept": {
                      "coding": [
                        {
                          "system": "http://hl7.org/fhir/questionnaire-item-control",
                          "code": "radio-button",
                          "display": "Radio Button"
                        }
                      ],
                      "text": "Radio Button"
                    }
                  }
                ],
                "answerOption": [
                  {
                    "valueCoding": {
                      "code": "y12",
                      "display": "Yes"
                    }
                  },
                  {
                    "valueCoding": {
                      "code": "n12",
                      "display": "No"
                    }
                  }
                ]
              },
              {
                "code": [
                  {
                    "system": "http://loinc.org",
                    "code": "89565-6",
                    "display": "Tell us about your Housing"
                  }
                ],
                "text": "What is your housing like?",
                "answerOption": [
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA29209-6",
                      "display": "My household is safe, adequate, unsubsidized housing"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA29210-4",
                      "display": "My household is in safe, adequate subsidized housing"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA29211-2",
                      "display": "I'm in stable housing that is safe but only marginally adequate"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA29212-0",
                      "display": "I'm in transitional, temporary or substandard housing; and/or current rent/mortgage is unaffordable"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA29213-8",
                      "display": "I'm homeless or threatened with eviction"
                    }
                  }
                ],
                "type": "choice",
                "linkId": "4015589149203"
              }
            ]
          },
          {
            "text": "Social Health Factors",
            "linkId": "9532759016656",
            "type": "group",
            "item": [
              {
                "text": "Factor 1",
                "linkId": "6905870764976",
                "type": "boolean"
              },
              {
                "text": "Factor 2",
                "linkId": "470758814098",
                "type": "boolean"
              },
              {
                "text": "Factor 3",
                "linkId": "7509548983744",
                "type": "boolean"
              },
              {
                "text": "Factor 4",
                "linkId": "4023910204408",
                "type": "boolean"
              },
              {
                "text": "Other",
                "linkId": "1760859232178",
                "type": "text"
              }
            ]
          },
          {
            "text": "Potential Interventions",
            "linkId": "132296208697",
            "type": "group",
            "item": [
              {
                "text": "Referral to emergency shelter",
                "linkId": "7726192546203",
                "type": "text"
              },
              {
                "text": "Drop-in services",
                "linkId": "1181813451725",
                "type": "text"
              },
              {
                "text": "Housing worker",
                "linkId": "1691530928972",
                "type": "text"
              },
              {
                "text": "Legal clinic",
                "linkId": "1798928746213",
                "type": "text"
              },
              {
                "text": "Tailoring care to challenges of homelessness",
                "linkId": "5176562486020",
                "type": "text"
              }
            ]
          },
          {
            "text": "Actions & Monitoring",
            "linkId": "3737535489341",
            "type": "group",
            "item": [
              {
                "text": "Date:",
                "linkId": "4633720821948",
                "type": "date"
              },
              {
                "text": "Result:",
                "linkId": "761379974602",
                "type": "text"
              },
              {
                "text": "Date:",
                "linkId": "5126906938772",
                "type": "date"
              },
              {
                "text": "Result:",
                "linkId": "1699303934001",
                "type": "text"
              },
              {
                "text": "Follow-up",
                "linkId": "4703877860199",
                "type": "boolean",
                "item": [
                  {
                    "text": "New item 11",
                    "linkId": "1501855811786",
                    "type": "string",
                    "_text": {
                      "extension": [
                        {
                          "url": "http://hl7.org/fhir/StructureDefinition/rendering-style",
                          "valueString": "visibility: hidden;"
                        }
                      ]
                    },
                    "enableWhen": [
                      {
                        "question": "4703877860199",
                        "operator": "=",
                        "answerBoolean": true
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "text": "EMPLOYMENT",
        "linkId": "491413566316",
        "type": "group",
        "_text": {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/rendering-style",
              "valueString": "font-weight: bold;"
            }
          ]
        },
        "item": [
          {
            "text": "Questions & Prompts",
            "linkId": "8915068479156",
            "type": "group",
            "item": [
              {
                "text": "Are you working right now?",
                "linkId": "968428148010",
                "type": "choice",
                "extension": [
                  {
                    "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
                    "valueCodeableConcept": {
                      "coding": [
                        {
                          "system": "http://hl7.org/fhir/questionnaire-item-control",
                          "code": "radio-button",
                          "display": "Radio Button"
                        }
                      ],
                      "text": "Radio Button"
                    }
                  }
                ],
                "item": [
                  {
                    "text": "What do you do for work?",
                    "linkId": "8231344950041",
                    "type": "string",
                    "enableWhen": [
                      {
                        "question": "968428148010",
                        "operator": "=",
                        "answerCoding": {
                          "code": "y13",
                          "display": "Yes"
                        }
                      }
                    ],
                    "enableBehavior": "all"
                  }
                ],
                "answerOption": [
                  {
                    "valueCoding": {
                      "code": "y13",
                      "display": "Yes"
                    }
                  },
                  {
                    "valueCoding": {
                      "code": "n13",
                      "display": "No"
                    }
                  }
                ]
              },
              {
                "text": "What kinds of work have you done in the past?",
                "linkId": "3054441175084",
                "type": "string"
              },
              {
                "text": "Do you have benefits such as drug coverage?",
                "linkId": "4712311605129",
                "type": "choice",
                "extension": [
                  {
                    "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
                    "valueCodeableConcept": {
                      "coding": [
                        {
                          "system": "http://hl7.org/fhir/questionnaire-item-control",
                          "code": "radio-button",
                          "display": "Radio Button"
                        }
                      ],
                      "text": "Radio Button"
                    }
                  }
                ],
                "answerOption": [
                  {
                    "valueCoding": {
                      "code": "y14",
                      "display": "Yes"
                    }
                  },
                  {
                    "valueCoding": {
                      "code": "n14",
                      "display": "No"
                    }
                  }
                ]
              },
              {
                "text": "Have you ever felt unsafe at work?",
                "linkId": "6029037350192",
                "type": "choice",
                "extension": [
                  {
                    "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
                    "valueCodeableConcept": {
                      "coding": [
                        {
                          "system": "http://hl7.org/fhir/questionnaire-item-control",
                          "code": "radio-button",
                          "display": "Radio Button"
                        }
                      ],
                      "text": "Radio Button"
                    }
                  }
                ],
                "item": [
                  {
                    "text": "Please explain.",
                    "linkId": "5955672504346",
                    "type": "text",
                    "enableWhen": [
                      {
                        "question": "6029037350192",
                        "operator": "=",
                        "answerCoding": {
                          "code": "y15",
                          "display": "Yes"
                        }
                      }
                    ]
                  }
                ],
                "answerOption": [
                  {
                    "valueCoding": {
                      "code": "y15",
                      "display": "Yes"
                    }
                  },
                  {
                    "valueCoding": {
                      "code": "n15",
                      "display": "No"
                    }
                  }
                ]
              }
            ]
          },
          {
            "text": "Social Health Factors",
            "linkId": "9990004944789",
            "type": "group",
            "item": [
              {
                "text": "Factor 1",
                "linkId": "136052072323",
                "type": "boolean"
              },
              {
                "text": "Factor 2",
                "linkId": "4677430358209",
                "type": "boolean"
              },
              {
                "text": "Factor 3",
                "linkId": "4634910460978",
                "type": "boolean"
              },
              {
                "text": "Factor 4",
                "linkId": "2696369751432",
                "type": "boolean"
              },
              {
                "text": "Other",
                "linkId": "589235483012",
                "type": "text"
              }
            ]
          },
          {
            "text": "Potential Interventions",
            "linkId": "1725560646385",
            "type": "group",
            "item": [
              {
                "text": "Resume-writing services",
                "linkId": "7383061595213",
                "type": "text"
              },
              {
                "text": "Employment counselling services",
                "linkId": "2927879859074",
                "type": "text"
              },
              {
                "text": "Ensuring medications are covered or low-cost",
                "linkId": "3646287149663",
                "type": "text"
              }
            ]
          },
          {
            "text": "Actions & Monitoring",
            "linkId": "1036201478647",
            "type": "group",
            "item": [
              {
                "text": "Date:",
                "linkId": "3425475255620",
                "type": "date"
              },
              {
                "text": "Result:",
                "linkId": "3536135742823",
                "type": "text"
              },
              {
                "text": "Date:",
                "linkId": "3896656658997",
                "type": "date"
              },
              {
                "text": "Result:",
                "linkId": "4773078139334",
                "type": "text"
              },
              {
                "text": "Follow-up",
                "linkId": "1210252972536",
                "type": "boolean",
                "item": [
                  {
                    "text": "New item 13",
                    "linkId": "959009323218",
                    "type": "string",
                    "_text": {
                      "extension": [
                        {
                          "url": "http://hl7.org/fhir/StructureDefinition/rendering-style",
                          "valueString": "visibility: hidden;"
                        }
                      ]
                    },
                    "enableWhen": [
                      {
                        "question": "1210252972536",
                        "operator": "=",
                        "answerBoolean": true
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "text": "EDUCATION",
        "linkId": "8032647229662",
        "type": "group",
        "_text": {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/rendering-style",
              "valueString": "font-weight: bold;"
            }
          ]
        },
        "item": [
          {
            "text": "Questions & Prompts",
            "linkId": "541765171105",
            "type": "group",
            "item": [
              {
                "code": [
                  {
                    "system": "http://loinc.org",
                    "code": "80913-7",
                    "display": "Highest level of education"
                  }
                ],
                "text": "How far did you go in your education?",
                "answerOption": [
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA36-9",
                      "display": "8th grade/less"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA12456-2",
                      "display": "9th - 12th grade, no diploma"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA12457-0",
                      "display": "High school graduate or GED completed"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA12458-8",
                      "display": "Some college credit but no degree"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA12459-6",
                      "display": "Associate degree (e.g., AA, AS)"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA12460-4",
                      "display": "Bachelor's degree (e.g., BA, AB, BS)"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA12461-2",
                      "display": "Master's degree (e.g., MA, MS, MEng, MEd, MSW, MBA)"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA12462-0",
                      "display": "Doctorate (e.g., PhD, EdD) or Professional degree (e.g., MD, DDS, DVM, LLB, JD)"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA4489-6",
                      "display": "Unknown"
                    }
                  }
                ],
                "type": "choice",
                "linkId": "2698242954211"
              },
              {
                "code": [
                  {
                    "system": "http://loinc.org",
                    "code": "98078-9",
                    "display": "Do you have difficulty reading or writing?"
                  }
                ],
                "extension": [
                  {
                    "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
                    "valueCodeableConcept": {
                      "coding": [
                        {
                          "system": "http://hl7.org/fhir/questionnaire-item-control",
                          "code": "radio-button",
                          "display": "Radio Button"
                        }
                      ],
                      "text": "Radio Button"
                    }
                  }
                ],
                "text": "Do you have difficulty reading or writing?",
                "answerOption": [
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA33-6",
                      "display": "Yes"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA32-8",
                      "display": "No"
                    }
                  }
                ],
                "type": "choice",
                "linkId": "3329470208859",
                "item": [
                  {
                    "text": "Please explain.",
                    "linkId": "2378012139986",
                    "type": "text",
                    "enableWhen": [
                      {
                        "question": "3329470208859",
                        "operator": "=",
                        "answerCoding": {
                          "system": "http://loinc.org",
                          "code": "LA33-6",
                          "display": "Yes"
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "text": "Social Health Factors",
            "linkId": "6660891048044",
            "type": "group",
            "item": [
              {
                "text": "Factor 1",
                "linkId": "4983244282020",
                "type": "boolean"
              },
              {
                "text": "Factor 2",
                "linkId": "5793151754982",
                "type": "boolean"
              },
              {
                "text": "Factor 3",
                "linkId": "2889246220105",
                "type": "boolean"
              },
              {
                "text": "Factor 4",
                "linkId": "4015875153341",
                "type": "boolean"
              },
              {
                "text": "Other",
                "linkId": "1660934030591",
                "type": "text"
              }
            ]
          },
          {
            "text": "Potential Interventions",
            "linkId": "5266774759242",
            "type": "group",
            "item": [
              {
                "text": "Literacy classes",
                "linkId": "4272844797722",
                "type": "text"
              },
              {
                "text": "Tailoring patient information and communication",
                "linkId": "3657880549942",
                "type": "text"
              },
              {
                "text": "Developmental assessment and services",
                "linkId": "8342824963611",
                "type": "text"
              }
            ]
          },
          {
            "text": "Actions & Monitoring",
            "linkId": "4261257598731",
            "type": "group",
            "item": [
              {
                "text": "Date:",
                "linkId": "8994379858410",
                "type": "date"
              },
              {
                "text": "Result:",
                "linkId": "5803950669839",
                "type": "text"
              },
              {
                "text": "Date:",
                "linkId": "4679033385927",
                "type": "date"
              },
              {
                "text": "Result:",
                "linkId": "9270969541412",
                "type": "text"
              },
              {
                "text": "Follow-up",
                "linkId": "3850228854897",
                "type": "boolean",
                "item": [
                  {
                    "text": "New item 15",
                    "linkId": "5858466407560",
                    "type": "string",
                    "_text": {
                      "extension": [
                        {
                          "url": "http://hl7.org/fhir/StructureDefinition/rendering-style",
                          "valueString": "visibility: hidden;"
                        }
                      ]
                    },
                    "enableWhen": [
                      {
                        "question": "3850228854897",
                        "operator": "=",
                        "answerBoolean": true
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "text": "LEGAL",
        "linkId": "2629497034951",
        "type": "group",
        "_text": {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/rendering-style",
              "valueString": "font-weight: bold;"
            }
          ]
        },
        "item": [
          {
            "text": "Questions & Prompts",
            "linkId": "6444485164972",
            "type": "group",
            "item": [
              {
                "code": [
                  {
                    "system": "http://loinc.org",
                    "code": "93677-3",
                    "display": "Do you need help with legal issues?"
                  }
                ],
                "extension": [
                  {
                    "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
                    "valueCodeableConcept": {
                      "coding": [
                        {
                          "system": "http://hl7.org/fhir/questionnaire-item-control",
                          "code": "radio-button",
                          "display": "Radio Button"
                        }
                      ],
                      "text": "Radio Button"
                    }
                  }
                ],
                "text": "Do you need help with legal issues?",
                "answerOption": [
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA33-6",
                      "display": "Yes"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA32-8",
                      "display": "No"
                    }
                  }
                ],
                "type": "choice",
                "linkId": "9511198553925",
                "item": [
                  {
                    "text": "Please explain.",
                    "linkId": "4514114622640",
                    "type": "text",
                    "enableWhen": [
                      {
                        "question": "9511198553925",
                        "operator": "=",
                        "answerCoding": {
                          "system": "http://loinc.org",
                          "code": "LA33-6",
                          "display": "Yes"
                        }
                      }
                    ]
                  }
                ]
              },
              {
                "text": "Have you had contact with the legal system?",
                "linkId": "647286883089",
                "type": "choice",
                "extension": [
                  {
                    "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
                    "valueCodeableConcept": {
                      "coding": [
                        {
                          "system": "http://hl7.org/fhir/questionnaire-item-control",
                          "code": "radio-button",
                          "display": "Radio Button"
                        }
                      ],
                      "text": "Radio Button"
                    }
                  }
                ],
                "item": [
                  {
                    "text": "Please explain.",
                    "linkId": "3180134334210",
                    "type": "text",
                    "enableWhen": [
                      {
                        "question": "647286883089",
                        "operator": "=",
                        "answerCoding": {
                          "code": "y18",
                          "display": "Yes"
                        }
                      }
                    ]
                  }
                ],
                "answerOption": [
                  {
                    "valueCoding": {
                      "code": "y18",
                      "display": "Yes"
                    }
                  },
                  {
                    "valueCoding": {
                      "code": "n18",
                      "display": "No"
                    }
                  }
                ]
              },
              {
                "text": "Are all your children in your care?",
                "linkId": "2521756362730",
                "type": "choice",
                "extension": [
                  {
                    "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
                    "valueCodeableConcept": {
                      "coding": [
                        {
                          "system": "http://hl7.org/fhir/questionnaire-item-control",
                          "code": "radio-button",
                          "display": "Radio Button"
                        }
                      ],
                      "text": "Radio Button"
                    }
                  }
                ],
                "item": [
                  {
                    "text": "Who looks after them?",
                    "linkId": "3859989018694",
                    "type": "string",
                    "enableWhen": [
                      {
                        "question": "2521756362730",
                        "operator": "=",
                        "answerCoding": {
                          "code": "n19",
                          "display": "No"
                        }
                      }
                    ]
                  }
                ],
                "answerOption": [
                  {
                    "valueCoding": {
                      "code": "y19",
                      "display": "Yes"
                    }
                  },
                  {
                    "valueCoding": {
                      "code": "n19",
                      "display": "No"
                    }
                  }
                ]
              }
            ]
          },
          {
            "text": "Social Health Factors",
            "linkId": "5265098387768",
            "type": "group",
            "item": [
              {
                "text": "Factor 1",
                "linkId": "1538692996528",
                "type": "boolean"
              },
              {
                "text": "Factor 2",
                "linkId": "5783228692494",
                "type": "boolean"
              },
              {
                "text": "Factor 3",
                "linkId": "3501692680209",
                "type": "boolean"
              },
              {
                "text": "Factor 4",
                "linkId": "5910216983859",
                "type": "boolean"
              },
              {
                "text": "Other",
                "linkId": "389737840380",
                "type": "text"
              }
            ]
          },
          {
            "text": "Potential Interventions",
            "linkId": "3165480277960",
            "type": "group",
            "item": [
              {
                "text": "Legal clinics",
                "linkId": "5268782361502",
                "type": "text"
              }
            ]
          },
          {
            "text": "Actions & Monitoring",
            "linkId": "5028369996372",
            "type": "group",
            "item": [
              {
                "text": "Date:",
                "linkId": "5024441427196",
                "type": "date"
              },
              {
                "text": "Result:",
                "linkId": "9695907566215",
                "type": "text"
              },
              {
                "text": "Date:",
                "linkId": "8142198196222",
                "type": "date"
              },
              {
                "text": "Result:",
                "linkId": "7218067096079",
                "type": "text"
              },
              {
                "text": "Follow-up",
                "linkId": "4625910014562",
                "type": "boolean",
                "item": [
                  {
                    "text": "New item 17",
                    "linkId": "5064116553899",
                    "type": "string",
                    "_text": {
                      "extension": [
                        {
                          "url": "http://hl7.org/fhir/StructureDefinition/rendering-style",
                          "valueString": "visibility: hidden;"
                        }
                      ]
                    },
                    "enableWhen": [
                      {
                        "question": "4625910014562",
                        "operator": "=",
                        "answerBoolean": true
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "text": "PERSONAL SAFETY",
        "linkId": "6781099677320",
        "type": "group",
        "_text": {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/rendering-style",
              "valueString": "font-weight: bold;"
            }
          ]
        },
        "item": [
          {
            "text": "Questions & Prompts",
            "linkId": "5382403857924",
            "type": "group",
            "item": [
              {
                "text": "Do you have any safety concerns?",
                "linkId": "1073229432733",
                "type": "choice",
                "extension": [
                  {
                    "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
                    "valueCodeableConcept": {
                      "coding": [
                        {
                          "system": "http://hl7.org/fhir/questionnaire-item-control",
                          "code": "radio-button",
                          "display": "Radio Button"
                        }
                      ],
                      "text": "Radio Button"
                    }
                  }
                ],
                "item": [
                  {
                    "text": "Please explain.",
                    "linkId": "5826251698761",
                    "type": "text",
                    "enableWhen": [
                      {
                        "question": "1073229432733",
                        "operator": "=",
                        "answerCoding": {
                          "code": "y20",
                          "display": "Yes"
                        }
                      }
                    ]
                  }
                ],
                "answerOption": [
                  {
                    "valueCoding": {
                      "code": "y20",
                      "display": "Yes"
                    }
                  },
                  {
                    "valueCoding": {
                      "code": "n20",
                      "display": "No"
                    }
                  }
                ]
              },
              {
                "text": "Do you feel safe in your relationship?",
                "linkId": "5760261697748",
                "type": "choice",
                "extension": [
                  {
                    "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
                    "valueCodeableConcept": {
                      "coding": [
                        {
                          "system": "http://hl7.org/fhir/questionnaire-item-control",
                          "code": "radio-button",
                          "display": "Radio Button"
                        }
                      ],
                      "text": "Radio Button"
                    }
                  }
                ],
                "item": [
                  {
                    "text": "Please explain.",
                    "linkId": "3723416735390",
                    "type": "text",
                    "enableWhen": [
                      {
                        "question": "5760261697748",
                        "operator": "=",
                        "answerCoding": {
                          "code": "n21",
                          "display": "No"
                        }
                      }
                    ]
                  }
                ],
                "answerOption": [
                  {
                    "valueCoding": {
                      "code": "y21",
                      "display": "Yes"
                    }
                  },
                  {
                    "valueCoding": {
                      "code": "n21",
                      "display": "No"
                    }
                  }
                ]
              },
              {
                "text": "Has your partner ever hurt you or your children?",
                "linkId": "1078676080864",
                "type": "choice",
                "extension": [
                  {
                    "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
                    "valueCodeableConcept": {
                      "coding": [
                        {
                          "system": "http://hl7.org/fhir/questionnaire-item-control",
                          "code": "radio-button",
                          "display": "Radio Button"
                        }
                      ],
                      "text": "Radio Button"
                    }
                  }
                ],
                "answerOption": [
                  {
                    "valueCoding": {
                      "code": "y22",
                      "display": "Yes"
                    }
                  },
                  {
                    "valueCoding": {
                      "code": "n22",
                      "display": "No"
                    }
                  }
                ]
              },
              {
                "code": [
                  {
                    "system": "http://loinc.org",
                    "code": "93026-3",
                    "display": "Do you feel physically and emotionally safe where you currently live?"
                  }
                ],
                "text": "Do you feel physically and emotionally safe where you currently live?",
                "answerOption": [
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA33-6",
                      "display": "Yes"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA32-8",
                      "display": "No"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA14072-5",
                      "display": "Unsure"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA30122-8",
                      "display": "I choose not to answer this question"
                    }
                  }
                ],
                "type": "choice",
                "linkId": "521435184895"
              }
            ]
          },
          {
            "text": "Social Health Factors",
            "linkId": "3221258211391",
            "type": "group",
            "item": [
              {
                "text": "Factor 1",
                "linkId": "2230580211657",
                "type": "boolean"
              },
              {
                "text": "Factor 2",
                "linkId": "7549819741272",
                "type": "boolean"
              },
              {
                "text": "Factor 3",
                "linkId": "3958852895330",
                "type": "boolean"
              },
              {
                "text": "Factor 4",
                "linkId": "679162337073",
                "type": "boolean"
              },
              {
                "text": "Other",
                "linkId": "32208236697",
                "type": "text"
              }
            ]
          },
          {
            "text": "Potential Interventions",
            "linkId": "9713762249839",
            "type": "group",
            "item": [
              {
                "text": "Violence Against Women services",
                "linkId": "7116112852740",
                "type": "text"
              },
              {
                "text": "Crisis helplines",
                "linkId": "2986523668067",
                "type": "text"
              },
              {
                "text": "Legal services",
                "linkId": "7446563057213",
                "type": "text"
              },
              {
                "text": "Counselling",
                "linkId": "8331728861009",
                "type": "text"
              },
              {
                "text": "Support groups",
                "linkId": "2833735275492",
                "type": "text"
              }
            ]
          },
          {
            "text": "Actions & Monitoring",
            "linkId": "5436512878667",
            "type": "group",
            "item": [
              {
                "text": "Date:",
                "linkId": "5658779221928",
                "type": "date"
              },
              {
                "text": "Result:",
                "linkId": "3496944793286",
                "type": "text"
              },
              {
                "text": "Date:",
                "linkId": "3333345785809",
                "type": "date"
              },
              {
                "text": "Result:",
                "linkId": "444014855333",
                "type": "text"
              },
              {
                "text": "Follow-up",
                "linkId": "8893716823248",
                "type": "boolean",
                "item": [
                  {
                    "text": "New item 19",
                    "linkId": "4047568696359",
                    "type": "string",
                    "_text": {
                      "extension": [
                        {
                          "url": "http://hl7.org/fhir/StructureDefinition/rendering-style",
                          "valueString": "visibility: hidden;"
                        }
                      ]
                    },
                    "enableWhen": [
                      {
                        "question": "8893716823248",
                        "operator": "=",
                        "answerBoolean": true
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "text": "SUBSTANCES",
        "linkId": "8321039679447",
        "type": "group",
        "_text": {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/rendering-style",
              "valueString": "font-weight: bold;"
            }
          ]
        },
        "item": [
          {
            "text": "Questions & Prompts",
            "linkId": "4692836443794",
            "type": "group",
            "item": [
              {
                "code": [
                  {
                    "system": "http://loinc.org",
                    "code": "72166-2",
                    "display": "Tobac smoke stat"
                  }
                ],
                "text": "Do you smoke/use tobacco products?",
                "answerOption": [
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA18976-3",
                      "display": "Current every day smoker"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA18977-1",
                      "display": "Current some day smoker"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA15920-4",
                      "display": "Former smoker"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA18978-9",
                      "display": "Never smoker"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA18979-7",
                      "display": "Smoker, current status unknown"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA18980-5",
                      "display": "Unknown if ever smoked"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA18981-3",
                      "display": "Heavy tobacco smoker"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA18982-1",
                      "display": "Light tobacco smoker"
                    }
                  }
                ],
                "type": "choice",
                "linkId": "107285480684",
                "item": [
                  {
                    "code": [
                      {
                        "system": "http://loinc.org",
                        "code": "64218-1",
                        "display": "How many cigarettes do you smoke per day now?"
                      }
                    ],
                    "text": "How much a day?",
                    "type": "decimal",
                    "extension": [
                      {
                        "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-unit",
                        "valueCoding": {
                          "system": "http://unitsofmeasure.org",
                          "code": {
                            "unit": "/d"
                          },
                          "display": {
                            "unit": "/d"
                          }
                        }
                      },
                      {
                        "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-unit",
                        "valueCoding": {
                          "system": "http://unitsofmeasure.org",
                          "code": "d",
                          "display": "day"
                        }
                      },
                      {
                        "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-unit",
                        "valueCoding": {
                          "system": "http://unitsofmeasure.org",
                          "code": "d",
                          "display": "day"
                        }
                      },
                      {
                        "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-unit",
                        "valueCoding": {
                          "system": "http://unitsofmeasure.org",
                          "code": "d",
                          "display": "day"
                        }
                      }
                    ],
                    "linkId": "2993335799260",
                    "enableWhen": [
                      {
                        "question": "107285480684",
                        "operator": "=",
                        "answerCoding": {
                          "system": "http://loinc.org",
                          "code": "LA18976-3",
                          "display": "Current every day smoker"
                        }
                      },
                      {
                        "question": "107285480684",
                        "operator": "=",
                        "answerCoding": {
                          "system": "http://loinc.org",
                          "code": "LA18977-1",
                          "display": "Current some day smoker"
                        }
                      },
                      {
                        "question": "107285480684",
                        "operator": "=",
                        "answerCoding": {
                          "system": "http://loinc.org",
                          "code": "LA18981-3",
                          "display": "Heavy tobacco smoker"
                        }
                      },
                      {
                        "question": "107285480684",
                        "operator": "=",
                        "answerCoding": {
                          "system": "http://loinc.org",
                          "code": "LA18982-1",
                          "display": "Light tobacco smoker"
                        }
                      }
                    ]
                  }
                ]
              },
              {
                "text": "Do you use marijuana?",
                "linkId": "538337515934",
                "type": "choice",
                "extension": [
                  {
                    "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
                    "valueCodeableConcept": {
                      "coding": [
                        {
                          "system": "http://hl7.org/fhir/questionnaire-item-control",
                          "code": "radio-button",
                          "display": "Radio Button"
                        }
                      ],
                      "text": "Radio Button"
                    }
                  }
                ],
                "item": [
                  {
                    "text": "How much a day?",
                    "linkId": "4675225521611",
                    "type": "integer",
                    "enableWhen": [
                      {
                        "question": "538337515934",
                        "operator": "=",
                        "answerCoding": {
                          "code": "y25",
                          "display": "Yes"
                        }
                      }
                    ]
                  }
                ],
                "answerOption": [
                  {
                    "valueCoding": {
                      "code": "y25",
                      "display": "Yes"
                    }
                  },
                  {
                    "valueCoding": {
                      "code": "n25",
                      "display": "No"
                    }
                  }
                ]
              },
              {
                "code": [
                  {
                    "system": "http://loinc.org",
                    "code": "68518-0",
                    "display": "Have alcohol nRate"
                  }
                ],
                "text": "How often do you have alcohol?",
                "answerOption": [
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA6270-8",
                      "display": "Never"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA18926-8",
                      "display": "Monthly or less"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA18927-6",
                      "display": "2-4 times a month"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA18928-4",
                      "display": "2-3 times a week"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA18929-2",
                      "display": "4 or more times a week"
                    }
                  }
                ],
                "type": "choice",
                "linkId": "5022925407428"
              },
              {
                "text": "Do you use any recreational drugs?",
                "linkId": "5806463850163",
                "type": "choice",
                "extension": [
                  {
                    "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
                    "valueCodeableConcept": {
                      "coding": [
                        {
                          "system": "http://hl7.org/fhir/questionnaire-item-control",
                          "code": "radio-button",
                          "display": "Radio Button"
                        }
                      ],
                      "text": "Radio Button"
                    }
                  }
                ],
                "item": [
                  {
                    "text": "How have you used them and how much?",
                    "linkId": "4605794106889",
                    "type": "text",
                    "enableWhen": [
                      {
                        "question": "5806463850163",
                        "operator": "=",
                        "answerCoding": {
                          "code": "y26",
                          "display": "Yes"
                        }
                      }
                    ]
                  },
                  {
                    "text": "What about in the past?",
                    "linkId": "8568455957989",
                    "type": "text"
                  }
                ],
                "answerOption": [
                  {
                    "valueCoding": {
                      "code": "y26",
                      "display": "Yes"
                    }
                  },
                  {
                    "valueCoding": {
                      "code": "n26",
                      "display": "No"
                    }
                  }
                ]
              },
              {
                "text": "Have you ever had problem with substance use?",
                "linkId": "4916917602896",
                "type": "choice",
                "extension": [
                  {
                    "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
                    "valueCodeableConcept": {
                      "coding": [
                        {
                          "system": "http://hl7.org/fhir/questionnaire-item-control",
                          "code": "radio-button",
                          "display": "Radio Button"
                        }
                      ],
                      "text": "Radio Button"
                    }
                  }
                ],
                "answerOption": [
                  {
                    "valueCoding": {
                      "code": "y27",
                      "display": "Yes"
                    }
                  },
                  {
                    "valueCoding": {
                      "code": "n27",
                      "display": "No"
                    }
                  }
                ]
              }
            ]
          },
          {
            "text": "Social Health Factors",
            "linkId": "8015500615376",
            "type": "group",
            "item": [
              {
                "text": "Factor 1",
                "linkId": "9739960673",
                "type": "boolean"
              },
              {
                "text": "Factor 2",
                "linkId": "8528308272577",
                "type": "boolean"
              },
              {
                "text": "Factor 3",
                "linkId": "9687154426201",
                "type": "boolean"
              },
              {
                "text": "Factor 4",
                "linkId": "2795803617995",
                "type": "boolean"
              },
              {
                "text": "Other",
                "linkId": "6548161004000",
                "type": "text"
              }
            ]
          },
          {
            "text": "Potential Interventions",
            "linkId": "3854783135168",
            "type": "group",
            "item": [
              {
                "text": "Motivational interviewing and pharmacological therapies",
                "linkId": "3685300999983",
                "type": "text"
              },
              {
                "text": "Support groups and counselling",
                "linkId": "8328562313528",
                "type": "text"
              },
              {
                "text": "Inpatient and outpatient rehab and programs",
                "linkId": "9084930799405",
                "type": "text"
              },
              {
                "text": "Detox and harm reduction services",
                "linkId": "2497961444644",
                "type": "text"
              }
            ]
          },
          {
            "text": "Actions & Monitoring",
            "linkId": "3309795391007",
            "type": "group",
            "item": [
              {
                "text": "Date:",
                "linkId": "8025956692651",
                "type": "date"
              },
              {
                "text": "Result:",
                "linkId": "4708275123424",
                "type": "text"
              },
              {
                "text": "Date:",
                "linkId": "8841936286933",
                "type": "date"
              },
              {
                "text": "Result:",
                "linkId": "2214599001971",
                "type": "text"
              },
              {
                "text": "Follow-up",
                "linkId": "6419664333764",
                "type": "boolean",
                "item": [
                  {
                    "text": "New item 21",
                    "linkId": "5201842912739",
                    "type": "string",
                    "_text": {
                      "extension": [
                        {
                          "url": "http://hl7.org/fhir/StructureDefinition/rendering-style",
                          "valueString": "visibility: hidden;"
                        }
                      ]
                    },
                    "enableWhen": [
                      {
                        "question": "6419664333764",
                        "operator": "=",
                        "answerBoolean": true
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "text": "SENIORS",
        "linkId": "9755157998020",
        "type": "group",
        "_text": {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/rendering-style",
              "valueString": "font-weight: bold;"
            }
          ]
        },
        "item": [
          {
            "text": "Questions & Prompts",
            "linkId": "8568391328019",
            "type": "group",
            "item": [
              {
                "text": "How are you managing at home?",
                "linkId": "3207510582172",
                "type": "text"
              },
              {
                "text": "Where do you live?",
                "linkId": "5298946181823",
                "type": "string"
              },
              {
                "text": "Do you live with anyone?",
                "linkId": "2679620587365",
                "type": "choice",
                "extension": [
                  {
                    "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
                    "valueCodeableConcept": {
                      "coding": [
                        {
                          "system": "http://hl7.org/fhir/questionnaire-item-control",
                          "code": "radio-button",
                          "display": "Radio Button"
                        }
                      ],
                      "text": "Radio Button"
                    }
                  }
                ],
                "item": [
                  {
                    "text": "Who?",
                    "linkId": "8266269654746",
                    "type": "string",
                    "enableWhen": [
                      {
                        "question": "2679620587365",
                        "operator": "=",
                        "answerCoding": {
                          "code": "y29",
                          "display": "Yes"
                        }
                      }
                    ]
                  }
                ],
                "answerOption": [
                  {
                    "valueCoding": {
                      "code": "y29",
                      "display": "Yes"
                    }
                  },
                  {
                    "valueCoding": {
                      "code": "n29",
                      "display": "No"
                    }
                  }
                ]
              },
              {
                "text": "Who does the shopping, cleaning, cooking, etc.?",
                "linkId": "7283122720320",
                "type": "string",
                "item": [
                  {
                    "text": "https://www.seniorplanningservices.com/files/2013/12/Santa-Barbara-ADL-IADL-Checklist.pdf",
                    "type": "display",
                    "linkId": "7283122720320_helpText",
                    "extension": [
                      {
                        "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
                        "valueCodeableConcept": {
                          "text": "Help-Button",
                          "coding": [
                            {
                              "code": "help",
                              "display": "Help-Button",
                              "system": "http://hl7.org/fhir/questionnaire-item-control"
                            }
                          ]
                        }
                      }
                    ]
                  }
                ]
              },
              {
                "text": "Who is available to support you if you need it?",
                "linkId": "5963218285609",
                "type": "string"
              },
              {
                "code": [
                  {
                    "system": "http://loinc.org",
                    "code": "52552-7",
                    "display": "Falls in the past Y"
                  }
                ],
                "text": "Have you had any falls?",
                "answerOption": [
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA32-8",
                      "display": "No"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA33-6",
                      "display": "Yes"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA4489-6",
                      "display": "Unknown"
                    }
                  }
                ],
                "type": "choice",
                "linkId": "5972944643099"
              },
              {
                "code": [
                  {
                    "system": "http://loinc.org",
                    "code": "64849-3",
                    "display": "Now, I'd like to ask about driving a car. Are you currently driving, at least once in a while?"
                  }
                ],
                "extension": [
                  {
                    "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
                    "valueCodeableConcept": {
                      "coding": [
                        {
                          "system": "http://hl7.org/fhir/questionnaire-item-control",
                          "code": "radio-button",
                          "display": "Radio Button"
                        }
                      ],
                      "text": "Radio Button"
                    }
                  }
                ],
                "text": "Are you still driving?",
                "answerOption": [
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA33-6",
                      "display": "Yes"
                    }
                  },
                  {
                    "valueCoding": {
                      "system": "http://loinc.org",
                      "code": "LA32-8",
                      "display": "No"
                    }
                  }
                ],
                "type": "choice",
                "linkId": "6065478956309"
              },
              {
                "text": "Do you have an ACP?",
                "linkId": "939626596305",
                "type": "choice",
                "extension": [
                  {
                    "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
                    "valueCodeableConcept": {
                      "coding": [
                        {
                          "system": "http://hl7.org/fhir/questionnaire-item-control",
                          "code": "radio-button",
                          "display": "Radio Button"
                        }
                      ],
                      "text": "Radio Button"
                    }
                  }
                ],
                "answerOption": [
                  {
                    "valueCoding": {
                      "code": "y32",
                      "display": "Yes"
                    }
                  },
                  {
                    "valueCoding": {
                      "code": "n32",
                      "display": "No"
                    }
                  }
                ]
              }
            ]
          },
          {
            "text": "Social Health Factors",
            "linkId": "9579726862223",
            "type": "group",
            "item": [
              {
                "text": "Factor 1",
                "linkId": "9133415697908",
                "type": "boolean"
              },
              {
                "text": "Factor 2",
                "linkId": "6237601438029",
                "type": "boolean"
              },
              {
                "text": "Factor 3",
                "linkId": "2531406890433",
                "type": "boolean"
              },
              {
                "text": "Factor 4",
                "linkId": "3723365453328",
                "type": "boolean"
              },
              {
                "text": "Other",
                "linkId": "3906935521508",
                "type": "text"
              }
            ]
          },
          {
            "text": "Potential Interventions",
            "linkId": "8595931826560",
            "type": "group",
            "item": [
              {
                "text": "MOCA/MMSE/MiniCog",
                "linkId": "432654494781",
                "type": "text"
              },
              {
                "text": "Home supports",
                "linkId": "9778403141615",
                "type": "text"
              },
              {
                "text": "Advance care planning",
                "linkId": "6628425418162",
                "type": "text",
                "item": [
                  {
                    "text": "https://www.health.gov.bc.ca/library/publications/year/2020/MyVoice-AdvanceCarePlanningGuide.pdf",
                    "type": "display",
                    "linkId": "6628425418162_helpText",
                    "extension": [
                      {
                        "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
                        "valueCodeableConcept": {
                          "text": "Help-Button",
                          "coding": [
                            {
                              "code": "help",
                              "display": "Help-Button",
                              "system": "http://hl7.org/fhir/questionnaire-item-control"
                            }
                          ]
                        }
                      }
                    ]
                  }
                ]
              },
              {
                "text": "Day programs",
                "linkId": "9920376583885",
                "type": "text"
              }
            ]
          },
          {
            "text": "Actions & Monitoring",
            "linkId": "4221941230959",
            "type": "display"
          },
          {
            "text": "Date:",
            "linkId": "7772168429800",
            "type": "date"
          },
          {
            "text": "Result:",
            "linkId": "3481929628053",
            "type": "text"
          },
          {
            "text": "Date:",
            "linkId": "3680561180732",
            "type": "date"
          },
          {
            "text": "Result:",
            "linkId": "2374042818038",
            "type": "text"
          },
          {
            "text": "Follow-up",
            "linkId": "1106343889775",
            "type": "boolean",
            "item": [
              {
                "text": "New item 23",
                "linkId": "8052548614896",
                "type": "string",
                "_text": {
                  "extension": [
                    {
                      "url": "http://hl7.org/fhir/StructureDefinition/rendering-style",
                      "valueString": "visibility: hidden;"
                    }
                  ]
                },
                "enableWhen": [
                  {
                    "question": "1106343889775",
                    "operator": "=",
                    "answerBoolean": true
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }