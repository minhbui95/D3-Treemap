var data = flare;

//////////////////////////////////////////////////////////////////////////////
function setTreeSize(tree)
{
    if (tree.children !== undefined) {
        var size = 0;
        for (var i=0; i<tree.children.length; ++i) {
            size += setTreeSize(tree.children[i]);
        }
        tree.size = size;
    }
    if (tree.children === undefined) {
        // do nothing, tree.size is already defined for leaves
    }
    return tree.size;
};

function setTreeCount(tree)
{
    if (tree.children !== undefined) {
        var count = 0;
        for (var i=0; i<tree.children.length; ++i) {
            count += setTreeCount(tree.children[i]);
        }
        tree.count = count;
    }
    if (tree.children === undefined) {
        tree.count = 1;
    }
    return tree.count;
}

function setTreeDepth(tree, depth)
{
    tree.depth = depth;
    maxDepth = depth;
    if (tree.children !== undefined) {
        maxDepth = depth + 1;
        for (var i=0; i<tree.children.length; ++i) {
            var curChildDepth = setTreeDepth(tree.children[i], depth + 1);
            maxDepth = Math.max(maxDepth, curChildDepth) + 1;
        }
    }

    if (tree.children == undefined) {

    }
    return maxDepth;
};

setTreeSize(data);
setTreeCount(data);
var maxDepth = setTreeDepth(data, 0);

function setRectangles(rect, tree, attrFun, axis)
{
    var i;
    tree.rect = rect;

    if (tree.children !== undefined) {
        var cumulativeSizes = [0];
        for (i=0; i<tree.children.length; ++i) {
            cumulativeSizes.push(cumulativeSizes[i] + attrFun(tree.children[i]));
        }
        var height = rect.y2 - rect.y1, width = rect.x2 - rect.x1;
        var scale = d3.scaleLinear()
                .domain([0, cumulativeSizes[cumulativeSizes.length-1]])
        var border = 1;

        if (axis) {
            scale.range([border, border + width]);
        }
        else {
            scale.range([border, border + height]);
        }
        for (i=0; i<tree.children.length; ++i) {
            console.log("Depth: " + tree.depth + " Axis: " + axis);
            tree.children[i].border = border;
            if (axis) {
                var newRect = { x1: rect.x1 + scale(cumulativeSizes[i]) + border,
                                x2: rect.x1 + scale(cumulativeSizes[i+1]) - border,
                                y1: rect.y1 + border,
                                y2: rect.y2 - border
                };
            } else {
                var newRect = { x1: rect.x1 + border,
                                x2: rect.x2 - border,
                                y1: rect.y1 + scale(cumulativeSizes[i]) + border,
                                y2: rect.y1 + scale(cumulativeSizes[i+1]) - border}
            }

            setRectangles(newRect, tree.children[i], attrFun, !axis);
        }
    }
}

function setRectanglesBest(rect, tree, attrFun)
{
    var i;
    tree.rect = rect;

    if (tree.children !== undefined) {
        var cumulativeSizes = [0];
        for (i=0; i<tree.children.length; ++i) {
            cumulativeSizes.push(cumulativeSizes[i] + attrFun(tree.children[i]));
        }
        var height = rect.y2 - rect.y1, width = rect.x2 - rect.x1;
        var scale = d3.scaleLinear()
                .domain([0, cumulativeSizes[cumulativeSizes.length-1]])
        var border = 1;

        if (width > height) {
            scale.range([border, border + width]);
        }
        else {
            scale.range([border, border + height]);
        }
        for (i=0; i<tree.children.length; ++i) {
            if (width > height) {
                var newRect = { x1: rect.x1 + scale(cumulativeSizes[i]) + border,
                            x2: rect.x1 + scale(cumulativeSizes[i+1]) - border,
                            y1: rect.y1 + border,
                            y2: rect.y2 - border,
                };
            }
            else {
                var newRect = { x1: rect.x1 + border,
                                x2: rect.x2 - border,
                                y1: rect.y1 + scale(cumulativeSizes[i]) + border,
                                y2: rect.y1 + scale(cumulativeSizes[i+1]) - border,
                };
            }

            setRectanglesBest(newRect, tree.children[i], attrFun);
        }
    }
}

var width = window.innerWidth;
var height = window.innerHeight;

setRectangles(
    {x1: 0, x2: width, y1: 0, y2: height}, data,
    function(t) { return t.size; }, true
);

function makeTreeNodeList(tree, lst)
{
    lst.push(tree);
    if (tree.children !== undefined) {
        for (var i=0; i<tree.children.length; ++i) {
            makeTreeNodeList(tree.children[i], lst);
        }
    }
}

var treeNodeList = [];
makeTreeNodeList(data, treeNodeList);

var gs = d3.select("#svg")
        .attr("width", width)
        .attr("height", height)
        .selectAll("g")
        .data(treeNodeList)
        .enter()
        .append("g");

var colorScale = d3.scaleLinear().domain([0, maxDepth]).range([d3.lab("blue"), d3.lab("lightblue")]);
function setAttrs(sel) {
    sel.attr("width", function(treeNode) {
        return treeNode.rect.x2 - treeNode.rect.x1;
    }).attr("height", function(treeNode) {
        return treeNode.rect.y2 - treeNode.rect.y1;
    }).attr("x", function(treeNode) {
        return treeNode.rect.x1;
    }).attr("y", function(treeNode) {
        return treeNode.rect.y1;
    }).attr("fill", function(treeNode) {
        return colorScale(treeNode.depth);
    }).attr("stroke", function(treeNode) {
        return "black";
    }).attr("title", function(treeNode) {
        return treeNode.name;
    });
}

gs.append("rect").call(setAttrs);

d3.select("#count").on("click", function() {
    setRectangles(
        {x1: 0, x2: width, y1: 0, y2: height}, data,
        function(t) { return t.count;  }, true
    );
    d3.selectAll("rect").transition().duration(1000).call(setAttrs);
});

d3.select("#size").on("click", function() {
    setRectangles(
        {x1: 0, x2: width, y1: 0, y2: height}, data,
        function(t) { return t.size; }, true
    );
    d3.selectAll("rect").transition().duration(1000).call(setAttrs);
});

d3.select("#best-count").on("click", function() {
    setRectanglesBest(
        {x1: 0, x2: width, y1: 0, y2: height}, data,
        function(t) { return t.count; },
    );
    d3.selectAll("rect").transition().duration(1000).call(setAttrs);
});

d3.select("#best-size").on("click", function() {
    setRectanglesBest(
        {x1: 0, x2: width, y1: 0, y2: height}, data,
        function(t) { return t.size; },
    );
    d3.selectAll("rect").transition().duration(1000).call(setAttrs);
});
