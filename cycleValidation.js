let graphComponentMatrix = [];

for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
        //Why array -> More than 1 child relation(dependency)
        row.push([]);
    }
    graphComponentMatrix.push(row);
}

//True denotes cycle -> false not cyclic
function isGraphCyclic(graphComponentMatrix) {
    //dependency --> visited , DFS (2d Array)
    let visited = []; // NDOE VISIT -> true
    let dfsVisited = []; // Stack visit trace

    for (let i = 0; i < rows; i++) {
        let visitedRow = [];
        let dfsVisitedRow = [];
        for (let j = 0; j < cols; j++) {
            visitedRow.push(false);
            dfsVisitedRow.push(false);
        }
        visited.push(visitedRow);
        dfsVisited.push(dfsVisitedRow);
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (visited[i][j] === false) {
                let response = dfsCycleDetection(graphComponentMatrix, i, j, visited, dfsVisited);
                if (response === true) return true;
            }
        }
    }
}

//start -> visited(TRUE) and dfsvisited(TRUE)
//END -> dfsVISTIEN(FALSE)
//if visited[i][k] === true --> go back as already explored
//CYCLE DETECTION CONDITION -> if ( visited[i][j] == true and dfsvisited[i][j] == true --> cycle)
function dfsCycleDetection(graphComponentMatrix, srcr, srcc, visited, dfsVisited) {
    visited[srcr][srcc] = true;
    dfsVisited[srcr][srcc] = true;

    //A1 -> [ [0,1] , [1,0] ...  ]
    for (let children = 0; children < graphComponentMatrix[srcr][srcc].length; children++) {
        let [nbrr, nbrc] = graphComponentMatrix[srcr][srcc][children];
        if (visited[nbrr][nbrc] === false) {
            let response = dfsCycleDetection(graphComponentMatrix, nbrr, nbrc, visited, dfsVisited);
            if (response === true) return true; // FOUND CYCLE SO RETURN IMMEDIATELY >> DONT EXPLORE ANYMORE
        }
        else if (visited[nbrr][nbrc] === true && dfsVisited[nbrr][nbrc] === true) {
            return true;
            //same reason as above
        }
    }
    dfsVisited[srcr][srcc] = false;
    return false;
}