import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface Table {
  id: number;
  name: string;
  capacity: number;
  status: "available" | "reserved" | "occupied";
}

const TableManagement = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const [tableName, setTableName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [status, setStatus] = useState<"available" | "reserved" | "occupied">("available");

  const handleAddTable = () => {
    if (!tableName || !capacity || !status) return;

    const newTable: Table = {
      id: Date.now(),
      name: tableName,
      capacity: parseInt(capacity),
      status,
    };

    setTables([...tables, newTable]);
    setTableName("");
    setCapacity("");
    setStatus("available");
  };

  const getStatusBadge = (status: Table["status"]) => {
    switch (status) {
      case "available":
        return <Badge variant="default" className="bg-green-500">{status}</Badge>;
      case "reserved":
        return <Badge variant="default" className="bg-yellow-500">{status}</Badge>;
      case "occupied":
        return <Badge variant="default" className="bg-red-500">{status}</Badge>;
      default:
        return null;
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Table Management</h2>

      {/* Form to add new table */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          placeholder="Table Name"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />
        <Select value={status} onValueChange={(value) => setStatus(value as Table["status"])}>
          <SelectTrigger className="w-full md:w-[160px]">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="reserved">Reserved</SelectItem>
            <SelectItem value="occupied">Occupied</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleAddTable}>Add Table</Button>
      </div>

      {/* Table list */}
      <div className="grid gap-4">
        {tables.map((table) => (
          <Card key={table.id}>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="font-medium">Name: {table.name}</p>
                <p className="text-sm text-muted-foreground">Capacity: {table.capacity}</p>
                <p className="text-sm mt-1">Status: {getStatusBadge(table.status)}</p>
              </div>
              <Button
                variant="destructive"
                onClick={() =>
                  setTables(tables.filter((t) => t.id !== table.id))
                }
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TableManagement;
