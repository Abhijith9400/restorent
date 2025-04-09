import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Square,
  Circle,
  Triangle,
  Trash2,
  Edit,
  Plus,
  Save,
} from "lucide-react";

interface Table {
  id: string;
  number: number;
  shape: "square" | "circle" | "rectangle";
  seats: number;
  status: "available" | "reserved" | "occupied";
  positionX: number;
  positionY: number;
  width: number;
  height: number;
}

const TableManagement = () => {
  const [tables, setTables] = useState<Table[]>([
    {
      id: "1",
      number: 1,
      shape: "square",
      seats: 4,
      status: "available",
      positionX: 100,
      positionY: 100,
      width: 80,
      height: 80,
    },
    {
      id: "2",
      number: 2,
      shape: "circle",
      seats: 2,
      status: "reserved",
      positionX: 250,
      positionY: 100,
      width: 70,
      height: 70,
    },
    {
      id: "3",
      number: 3,
      shape: "rectangle",
      seats: 6,
      status: "occupied",
      positionX: 100,
      positionY: 250,
      width: 120,
      height: 80,
    },
  ]);

  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [newTable, setNewTable] = useState<Partial<Table>>({
    shape: "square",
    seats: 4,
    status: "available",
    width: 80,
    height: 80,
  });

  const [draggedTable, setDraggedTable] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleAddTable = () => {
    const tableNumber = Math.max(0, ...tables.map((t) => t.number)) + 1;
    const newTableWithId: Table = {
      id: Date.now().toString(),
      number: tableNumber,
      shape: newTable.shape || "square",
      seats: newTable.seats || 4,
      status: newTable.status || "available",
      positionX: 100,
      positionY: 100,
      width: newTable.width || 80,
      height: newTable.height || 80,
    };

    setTables([...tables, newTableWithId]);
    setIsAddDialogOpen(false);
    setNewTable({
      shape: "square",
      seats: 4,
      status: "available",
      width: 80,
      height: 80,
    });
  };

  const handleEditTable = () => {
    if (!selectedTable) return;

    setTables(
      tables.map((table) =>
        table.id === selectedTable.id ? selectedTable : table,
      ),
    );

    setIsEditDialogOpen(false);
    setSelectedTable(null);
  };

  const handleDeleteTable = () => {
    if (!selectedTable) return;

    setTables(tables.filter((table) => table.id !== selectedTable.id));
    setIsDeleteDialogOpen(false);
    setSelectedTable(null);
  };

  const handleTableMouseDown = (table: Table, e: React.MouseEvent) => {
    setDraggedTable(table.id);
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggedTable) return;

    const floorPlanRect = document
      .getElementById("floor-plan")
      ?.getBoundingClientRect();
    if (!floorPlanRect) return;

    setTables(
      tables.map((table) => {
        if (table.id === draggedTable) {
          return {
            ...table,
            positionX: Math.max(
              0,
              Math.min(
                e.clientX - floorPlanRect.left - dragOffset.x,
                floorPlanRect.width - table.width,
              ),
            ),
            positionY: Math.max(
              0,
              Math.min(
                e.clientY - floorPlanRect.top - dragOffset.y,
                floorPlanRect.height - table.height,
              ),
            ),
          };
        }
        return table;
      }),
    );
  };

  const handleMouseUp = () => {
    setDraggedTable(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 border-green-500";
      case "reserved":
        return "bg-yellow-100 border-yellow-500";
      case "occupied":
        return "bg-red-100 border-red-500";
      default:
        return "bg-gray-100 border-gray-500";
    }
  };

  const getTableShape = (table: Table) => {
    const baseClasses = `absolute border-2 flex items-center justify-center cursor-move ${getStatusColor(table.status)}`;

    switch (table.shape) {
      case "circle":
        return (
          <div
            className={`${baseClasses} rounded-full`}
            style={{
              left: table.positionX,
              top: table.positionY,
              width: table.width,
              height: table.height,
            }}
            onMouseDown={(e) => handleTableMouseDown(table, e)}
          >
            <div className="text-center">
              <div className="font-bold">{table.number}</div>
              <div className="text-xs">{table.seats} seats</div>
            </div>
          </div>
        );
      case "rectangle":
        return (
          <div
            className={`${baseClasses} rounded-md`}
            style={{
              left: table.positionX,
              top: table.positionY,
              width: table.width,
              height: table.height,
            }}
            onMouseDown={(e) => handleTableMouseDown(table, e)}
          >
            <div className="text-center">
              <div className="font-bold">{table.number}</div>
              <div className="text-xs">{table.seats} seats</div>
            </div>
          </div>
        );
      default: // square
        return (
          <div
            className={`${baseClasses} rounded-md`}
            style={{
              left: table.positionX,
              top: table.positionY,
              width: table.width,
              height: table.height,
            }}
            onMouseDown={(e) => handleTableMouseDown(table, e)}
          >
            <div className="text-center">
              <div className="font-bold">{table.number}</div>
              <div className="text-xs">{table.seats} seats</div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="p-6 bg-white h-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Table Management</h1>
        <div className="flex space-x-2">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Table
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Table</DialogTitle>
                <DialogDescription>
                  Create a new table with the following properties.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="table-number" className="text-right">
                    Number
                  </Label>
                  <Input
                    id="table-number"
                    type="number"
                    value={newTable.number || ""}
                    onChange={(e) =>
                      setNewTable({
                        ...newTable,
                        number: parseInt(e.target.value),
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="table-shape" className="text-right">
                    Shape
                  </Label>
                  <Select
                    value={newTable.shape}
                    onValueChange={(value) =>
                      setNewTable({
                        ...newTable,
                        shape: value as "square" | "circle" | "rectangle",
                      })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select shape" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="square">Square</SelectItem>
                      <SelectItem value="circle">Circle</SelectItem>
                      <SelectItem value="rectangle">Rectangle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="table-seats" className="text-right">
                    Seats
                  </Label>
                  <Input
                    id="table-seats"
                    type="number"
                    value={newTable.seats || ""}
                    onChange={(e) =>
                      setNewTable({
                        ...newTable,
                        seats: parseInt(e.target.value),
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="table-status" className="text-right">
                    Status
                  </Label>
                  <Select
                    value={newTable.status}
                    onValueChange={(value) =>
                      setNewTable({
                        ...newTable,
                        status: value as "available" | "reserved" | "occupied",
                      })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="reserved">Reserved</SelectItem>
                      <SelectItem value="occupied">Occupied</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="table-width" className="text-right">
                    Width (px)
                  </Label>
                  <Input
                    id="table-width"
                    type="number"
                    value={newTable.width || ""}
                    onChange={(e) =>
                      setNewTable({
                        ...newTable,
                        width: parseInt(e.target.value),
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="table-height" className="text-right">
                    Height (px)
                  </Label>
                  <Input
                    id="table-height"
                    type="number"
                    value={newTable.height || ""}
                    onChange={(e) =>
                      setNewTable({
                        ...newTable,
                        height: parseInt(e.target.value),
                      })
                    }
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddTable}>Add Table</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            disabled={!selectedTable}
            onClick={() => {
              if (selectedTable) setIsEditDialogOpen(true);
            }}
          >
            <Edit className="mr-2 h-4 w-4" /> Edit Table
          </Button>

          <AlertDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <AlertDialogTrigger asChild>
              <Button variant="destructive" disabled={!selectedTable}>
                <Trash2 className="mr-2 h-4 w-4" /> Delete Table
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  table #{selectedTable?.number}.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteTable}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="flex h-[calc(100vh-200px)]">
        <div className="w-3/4 pr-4">
          <Card className="h-full">
            <CardContent className="p-4">
              <div
                id="floor-plan"
                className="relative w-full h-full border border-gray-200 bg-gray-50 rounded-md overflow-hidden"
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                {tables.map((table) => getTableShape(table))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-1/4">
          <Card className="h-full">
            <CardContent className="p-4">
              <h3 className="text-lg font-medium mb-4">Table Properties</h3>
              {selectedTable ? (
                <div className="space-y-4">
                  <div>
                    <Label>Table Number</Label>
                    <div className="font-medium">{selectedTable.number}</div>
                  </div>
                  <div>
                    <Label>Shape</Label>
                    <div className="font-medium capitalize">
                      {selectedTable.shape}
                    </div>
                  </div>
                  <div>
                    <Label>Seats</Label>
                    <div className="font-medium">{selectedTable.seats}</div>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Select
                      value={selectedTable.status}
                      onValueChange={(value) =>
                        setSelectedTable({
                          ...selectedTable,
                          status: value as
                            | "available"
                            | "reserved"
                            | "occupied",
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="reserved">Reserved</SelectItem>
                        <SelectItem value="occupied">Occupied</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full" onClick={handleEditTable}>
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                  </Button>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  Select a table to view and edit its properties
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit Table Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Table #{selectedTable?.number}</DialogTitle>
            <DialogDescription>Update the table properties.</DialogDescription>
          </DialogHeader>
          {selectedTable && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-table-number" className="text-right">
                  Number
                </Label>
                <Input
                  id="edit-table-number"
                  type="number"
                  value={selectedTable.number}
                  onChange={(e) =>
                    setSelectedTable({
                      ...selectedTable,
                      number: parseInt(e.target.value),
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-table-shape" className="text-right">
                  Shape
                </Label>
                <Select
                  value={selectedTable.shape}
                  onValueChange={(value) =>
                    setSelectedTable({
                      ...selectedTable,
                      shape: value as "square" | "circle" | "rectangle",
                    })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="square">Square</SelectItem>
                    <SelectItem value="circle">Circle</SelectItem>
                    <SelectItem value="rectangle">Rectangle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-table-seats" className="text-right">
                  Seats
                </Label>
                <Input
                  id="edit-table-seats"
                  type="number"
                  value={selectedTable.seats}
                  onChange={(e) =>
                    setSelectedTable({
                      ...selectedTable,
                      seats: parseInt(e.target.value),
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-table-status" className="text-right">
                  Status
                </Label>
                <Select
                  value={selectedTable.status}
                  onValueChange={(value) =>
                    setSelectedTable({
                      ...selectedTable,
                      status: value as "available" | "reserved" | "occupied",
                    })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="reserved">Reserved</SelectItem>
                    <SelectItem value="occupied">Occupied</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-table-width" className="text-right">
                  Width (px)
                </Label>
                <Input
                  id="edit-table-width"
                  type="number"
                  value={selectedTable.width}
                  onChange={(e) =>
                    setSelectedTable({
                      ...selectedTable,
                      width: parseInt(e.target.value),
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-table-height" className="text-right">
                  Height (px)
                </Label>
                <Input
                  id="edit-table-height"
                  type="number"
                  value={selectedTable.height}
                  onChange={(e) =>
                    setSelectedTable({
                      ...selectedTable,
                      height: parseInt(e.target.value),
                    })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEditTable}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Legend</h3>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-100 border border-green-500 rounded-sm mr-2"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-100 border border-yellow-500 rounded-sm mr-2"></div>
            <span>Reserved</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-100 border border-red-500 rounded-sm mr-2"></div>
            <span>Occupied</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableManagement;
