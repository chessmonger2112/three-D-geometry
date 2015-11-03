var point1 = {x:50,y:200,z:100};
var point2 = {x:100,y:300,z:100};
var point3 = {x:150,y:100,z:40};
circle(100,100,20,2);
plane70 = planeMaker(point1,point2,point3);
printPlane(plane70);
var line70 = {m:3,P:3,n:1.5,Q:0};
graphLine(line70);


// point70 = planeLineIntersect(line70,plane70);
// point70y = pointConvert(point70.x, point70.y);
// point70z = pointConvert(point70.x, point70.z);
// circle(point70y,point70z,2,1);

// //plane70 = {A:1,B:1,D:-1};
// var line70 = {m:3,P:3,n:1.5,Q:0};
// graphLine(line70);

function graph(x1,y1,z1,x2,y2,z2)
{
    var gy1 = pointConvert(x1,y1);
    var gz1 = pointConvert(x1,z1);
    var gy2 = pointConvert(x2,y2);
    var gz2 = pointConvert(x2,z2);

    //call a function that checks if it is an area that should be seen, or is obscured but the object or another object

    if (x1 > - D)
    {
        context.beginPath();
        context.moveTo(gy1 + 00, gz1);
        context.lineTo(gy2 + 00, gz2);
        context.lineWidth = .3;
        context.closePath();
        context.stroke();
    }
}


function circle (x,y,r,w)
{
    context.lineWidth = w;
    context.beginPath();
    context.arc(x,y,r,0,2 * PI);
    context.closePath();
    context.stroke();
}
function printPlane(plane)
{
    var xLim = 100;
    var yLim = 100;

    var A = plane.A;
    var B = plane.B;
    var E = plane.D;

    for(var x = 0;x < xLim;x += 2)
    {
        for(var y = 0;y < yLim;y += 2)
        {
            var y1 = y + 1;
            var x1 = x + 1;
            var z = makeZ(x,y);
            var z1 = makeZ(x,y1);

            function makeZ(x,y)
            {
                return (-1 * A * x) - (B * y) - E;
            }

            graph(x,y,z,x1,y1,z1);
        }
    }
}









function graphLine(line)
{
    var xLim = 500;
    var m = line.m;
    var n = line.n;
    var P = line.P;
    var Q = line.Q;

    for(var x = 0;x < xLim; x++)
    {
        function makeZ(x)
        {
            return  m * x + P;
        }
        function makeY(z)
        {
            return  (z - Q) / n;
        }

        var z = makeZ(x);
        var z1 = makeZ(x + 1);
        var y = makeY(z);
        var y1 = makeY(z1);

        graph(x,y,z,x,y1,z1);
    }
}
function planeMaker (p1,p2,p3)  //takes in three points and creates plane
{
    var x1 = p1.x;
    var x2 = p2.x;
    var x3 = p3.x;
    var y1 = p1.y;
    var y2 = p2.y;
    var y3 = p3.y;
    var z1 = p1.z;
    var z2 = p2.z;
    var z3 = p3.z;

    var zDelt2 = z2 - z1
    var yDelt1 = y3 - y1;
    var yDelt2 = y1 - y2;
    var zDelt1 = z3 - z1;
    var xDelt1 = x1 - x3;
    var xDelt2 = x2 - x1;

    var ANum = (zDelt2 * yDelt1 / yDelt2) + zDelt1;
    var ADen = xDelt1 - xDelt2 * yDelt1 / yDelt2;

    var A = ANum / ADen;
    var B = (A * xDelt2 + zDelt2) / yDelt2;
    var D = (-1 * A * x3) - (B * y3) - z3;

    return {A:A,B:B,D:D};
}
function planeLineIntersect (line,plane)
{
    var A = plane.A;
    var B = plane.B;
    var E = plane.D;
    var m = line.m;
    var n = line.n;
    var P = line.P;
    var Q = line.Q;

    var Bdn = B / n;
    var xNum = Bdn * (Q - P) - P - E;
    var xDen = A + m * (Bdn + 1);
    var x = xNum / xDen;
    var mx = m * x;
    var y = (mx + P - Q) / n;
    var z = mx + P;
    return {x:x,y:y,z:z};
}
