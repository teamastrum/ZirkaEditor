let BABYLON = require('babylonjs');
let GUI = require('babylonjs-gui');
let materials = require('babylonjs-materials');

var canvas = document.getElementById("renderCanvas");

var createScene = function () {
    // Create scene
    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    camera.inertia = 0;
    camera.speed = 5;

    // Initialize GizmoManager
    var gizmoManager = new BABYLON.GizmoManager(scene)

    // Initialize all gizmos
    gizmoManager.boundingBoxGizmoEnabled=true;
    gizmoManager.positionGizmoEnabled = true;
    gizmoManager.rotationGizmoEnabled = true;
    gizmoManager.scaleGizmoEnabled = true;

    // Modify gizmos based on keypress
    document.onkeydown = (e)=>{
        if(e.key == 'w' || e.key == 'e'|| e.key == 'r'|| e.key == 'q'){
            // Switch gizmo type
            gizmoManager.positionGizmoEnabled = false;
            gizmoManager.rotationGizmoEnabled = false;
            gizmoManager.scaleGizmoEnabled = false;
            gizmoManager.boundingBoxGizmoEnabled = false;
            if(e.key == 'w'){
                gizmoManager.positionGizmoEnabled = true;
            }
            if(e.key == 'e'){
                gizmoManager.rotationGizmoEnabled = true;
            }
            if(e.key == 'r'){
                gizmoManager.scaleGizmoEnabled = true;
            }
            if(e.key == 'q'){
                gizmoManager.boundingBoxGizmoEnabled = true;
            }
        }
        if(e.key == 'y'){
            // hide the gizmo
            gizmoManager.attachToMesh(null);
        }
        if(e.key == 'a'){
            // Toggle local/global gizmo rotation positioning
            gizmoManager.gizmos.positionGizmo.updateGizmoRotationToMatchAttachedMesh = !gizmoManager.gizmos.positionGizmo.updateGizmoRotationToMatchAttachedMesh;
            gizmoManager.gizmos.rotationGizmo.updateGizmoRotationToMatchAttachedMesh = !gizmoManager.gizmos.rotationGizmo.updateGizmoRotationToMatchAttachedMesh;
        }
        if(e.key == 's'){
            // Toggle distance snapping
            if(gizmoManager.gizmos.scaleGizmo.snapDistance == 0){
                gizmoManager.gizmos.scaleGizmo.snapDistance = 0.3;
                gizmoManager.gizmos.rotationGizmo.snapDistance = 0.3;
                gizmoManager.gizmos.positionGizmo.snapDistance = 0.3;
            }else{
                gizmoManager.gizmos.scaleGizmo.snapDistance = 0;
                gizmoManager.gizmos.rotationGizmo.snapDistance = 0;
                gizmoManager.gizmos.positionGizmo.snapDistance = 0;
            }
        }
        if(e.key == 'd'){
            // Toggle gizmo size
            if(gizmoManager.gizmos.scaleGizmo.scaleRatio == 1){
                gizmoManager.gizmos.scaleGizmo.scaleRatio = 1.5;
                gizmoManager.gizmos.rotationGizmo.scaleRatio = 1.5;
                gizmoManager.gizmos.positionGizmo.scaleRatio = 1.5;
            }else{
                gizmoManager.gizmos.scaleGizmo.scaleRatio = 1;
                gizmoManager.gizmos.rotationGizmo.scaleRatio = 1;
                gizmoManager.gizmos.positionGizmo.scaleRatio = 1;
            }
        }
        if(e.key == '=') {
            camera.speed = 10;
        }
        if(e.key == '-') {
            camera.speed = 5;
        }
        if(e.key == '0') {
            camera.speed = 2.5;
        }
        if(e.key == '9') {
            camera.speed = 0.5;
        }

        console.log(camera.speed)

    }

    // Start by only enabling position control
    document.onkeydown({key: "w"})

    // Create objects
    var hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("files/img/textures/environment.dds", scene);
    var hdrSkybox = BABYLON.Mesh.CreateBox("hdrSkyBox", 1000.0, scene);
    hdrSkybox.isPickable = false;
    var hdrSkyboxMaterial = new BABYLON.PBRMaterial("skyBox", scene);
    hdrSkyboxMaterial.backFaceCulling = false;
    hdrSkyboxMaterial.reflectionTexture = hdrTexture.clone();
    hdrSkyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
	hdrSkyboxMaterial.microSurface = 1.0;
    hdrSkyboxMaterial.disableLighting = true;
    hdrSkybox.material = hdrSkyboxMaterial;
    hdrSkybox.infiniteDistance = true;
    // var light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene);
    var sphereGlass = BABYLON.Mesh.CreateSphere("sphereGlass", 48, 1.0, scene);
    sphereGlass.translate(new BABYLON.Vector3(1, 0, 0), -3);
    var sphereMetal = BABYLON.Mesh.CreateSphere("sphereMetal", 48, 1.0, scene);
    sphereMetal.translate(new BABYLON.Vector3(1, 0, 0), 3);
	var spherePlastic = BABYLON.Mesh.CreateSphere("spherePlastic", 48, 1.0, scene);
    spherePlastic.translate(new BABYLON.Vector3(0, 0, 1), -3);
    var woodPlank = BABYLON.MeshBuilder.CreateBox("plane", { width: 3, height: 0.1, depth: 3 }, scene);
    var glass = new BABYLON.PBRMaterial("glass", scene);
    glass.reflectionTexture = hdrTexture;
    glass.linkRefractionWithTransparency = true;
    glass.indexOfRefraction = 0.52;
    glass.alpha = 0;
    glass.microSurface = 1;
    glass.reflectivityColor = new BABYLON.Color3(0.2, 0.2, 0.2);
    glass.albedoColor = new BABYLON.Color3(0.85, 0.85, 0.85);
    sphereGlass.material = glass;
    var metal = new BABYLON.PBRMaterial("metal", scene);
    metal.reflectionTexture = hdrTexture;
    metal.microSurface = 0.96;
    metal.reflectivityColor = new BABYLON.Color3(0.85, 0.85, 0.85);
    metal.albedoColor = new BABYLON.Color3(0.01, 0.01, 0.01);
    sphereMetal.material = metal;
	var plastic = new BABYLON.PBRMaterial("plastic", scene);
    plastic.reflectionTexture = hdrTexture;
    plastic.microSurface = 0.96;
	plastic.albedoColor = new BABYLON.Color3(0.206, 0.94, 1);
	plastic.reflectivityColor = new BABYLON.Color3(0.003, 0.003, 0.003);
    spherePlastic.material = plastic;
    var wood = new BABYLON.PBRMaterial("wood", scene);
    wood.reflectionTexture = hdrTexture;
    wood.environmentIntensity = 1;
    wood.specularIntensity = 0.3;
    wood.reflectivityTexture = new BABYLON.Texture("./files/img/textures/reflectivity.png", scene);
    wood.useMicroSurfaceFromReflectivityMapAlpha = true;
    wood.albedoColor = BABYLON.Color3.White();
    wood.albedoTexture = new BABYLON.Texture("./files/img/textures/albedo.png", scene);
    woodPlank.material = wood;

    // Motion Blur
    var motionblur = new BABYLON.MotionBlurPostProcess(
        "mb", // The name of the effect.
        scene, // The scene containing the objects to blur according to their velocity.
        1.0, // The required width/height ratio to downsize to before computing the render pass.
        camera // The camera to apply the render pass to.
    );

    motionblur.motionStrength = 5;
    motionblur.motionBlurSamples = 64;

    return scene;
};

var engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
var scene = createScene();

engine.runRenderLoop(function () {
    if (scene) {
        scene.render();
    }
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});
