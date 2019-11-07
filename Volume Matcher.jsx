app.beginUndoGroup("Sound Match");

var comp = app.project.activeItem;
var audioOne = comp.layer(1);
var audioTwo = comp.layer(2);

matchAudio(audioOne, audioTwo);

app.endUndoGroup();

function matchAudio(layerOne, layerTwo) {
    var comp = layerOne.containingComp;
        deselectAllLayers(comp);
        layerOne.selected = true;
        app.executeCommand(5054);
        var keyLayerOne = comp.layer(1);
        keyLayerOne.inPoint = layerOne.inPoint;
        keyLayerOne.outPoint = layerOne.outPoint;
        keyLayerOne.moveBefore(layerOne);
        keyLayerOne.name = "Key Layer 1";
        layerOne.selected = false;
        layerTwo.selected = true;
        app.executeCommand(5054);
        var keyLayerTwo = comp.layer(1);
        keyLayerTwo.inPoint = layerTwo.inPoint;
        keyLayerTwo.outPoint = layerTwo.outPoint;
        keyLayerTwo.moveBefore(layerTwo);
        keyLayerTwo.name = "Key Layer 2";
        layerTwo.selected = false;
        
        var maxOne = getMaxKeyValue(keyLayerOne.Effects.property("Both Channels").property("Slider"), keyLayerOne);
        var maxTwo = getMaxKeyValue(keyLayerTwo.Effects.property("Both Channels").property("Slider"), keyLayerTwo);
        
        var difference;
        var levelsOne = layerOne.property("Audio").property("Audio Levels").value;
        var levelsTwo = layerTwo.property("Audio").property("Audio Levels").value;
        if(maxOne < maxTwo) {
            difference = maxTwo - maxOne;
            layerOne.property("Audio").property("Audio Levels").setValue(layerOne.property("Audio").property("Audio Levels").value+[difference, difference]);
            } else {
            difference = maxOne - maxTwo;
            layerTwo.property("Audio").property("Audio Levels").setValue(layerTwo.property("Audio").property("Audio Levels").value+[difference, difference]);    
                }
    }

function getMaxKeyValue(property, layer) {
    var max = 0;
    var keyMin = property.nearestKeyIndex(layer.inPoint);
    var keyMax = property.nearestKeyIndex(layer.outPoint);
    
    for(var i = keyMax; i > keyMin; i--) {
        if(property.keyValue(i) > max) {
                max = property.keyValue(i);
            }
        }
    return max;
    }

function deselectAllLayers(comp) {
        for(var i = 1; i < comp.numLayers; i++) {
            comp.layer(i).selected = false;
            }
    }