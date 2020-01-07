var test_1 = {
    "name": "root",
    "children": [
        {
            "name": "child1",
            "size": 10
        },
        {
            "name": "child2",
            "size": 20
        },
        {
            "name": "child3",
            "size": 30
        },
    ]
};

var test_2 = {
    "name": "root",
    "children": [
        {
            "name": "branch1",
            "children": [
                {
                    "name": "child1",
                    "size": 10
                },
                {
                    "name": "child2",
                    "size": 20
                },
                {
                    "name": "child3",
                    "size": 30
                },
            ]
        },
        {
            "name": "branch2",
            "children": [
                {
                    "name": "child1",
                    "size": 25
                },
                {
                    "name": "child2",
                    "size": 25
                },
            ]
        }
    ]
};

var test_3 = {
    "name": "root",
    "children": [
        {
            "name": "child1_lvl1",
            "size": 12,
        },
        {
            "name": "child2_lvl1",
            "size": 8,
        },
        {
            "name": "child3_lvl1",
            "children": [
                {
                    "name": "child1_lvl2",
                    "size": 2
                },
                {
                    "name": "child2_lvl2",
                    "size": 2
                },
                {
                    "name": "child3_lvl2",
                    "size": 2
                },
                {
                    "name": "child4_lvl2",
                    "size": 2
                },
                {
                    "name": "child5_lvl2",
                    "size": 2
                }
            ]
        },
        {
            "name": "child4_lvl1",
            "children": [
                {
                    "name": "child1_lvl2",
                    "children": [
                        {
                            "name": "child1_lvl3",
                            "size": 5,
                        },
                        {
                            "name": "child2_lvl3",
                            "size": 20,
                        }
                    ]
                },
                {
                    "name": "child2_lvl2",
                    "children": [
                        {
                            "name": "child1_lvl3",
                            "size": 5
                        },
                    ]
                },
                {
                    "name": "child3_lvl2",
                    "size": 40
                },
            ]
        }
    ]
}

var test_4 = {
    "name": "root",
    "children": [
        {
            "name": "c1",
            "size": 1
        },
        {
            "name": "c2",
            "size": 1
        },
        {
            "name": "c3",
            "size": 1
        },
        {
            "name": "c4",
            "size": 1
        },
    ]
}
