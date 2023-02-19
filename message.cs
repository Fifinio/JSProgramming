using System;
using System.Collections;
using System.Collections.Generic;

public class PriorityQueue<T> : IEnumerable<T> where T : IComparable<T>
{
    private List<T> list;

    public PriorityQueue()
    {
        list = new List<T>();
    }

    public PriorityQueue(IEnumerable<T> collection)
    {
        list = new List<T>(collection);
        for (int idx = list.Count / 2 - 1; idx >= 0; idx--)
        {
            HeapifyDown(idx);
        }
    }

    public int Count
    {
        get { return list.Count; }
    }

    public void Enqueue(T item)
    {
        list.Add(item);
        HeapifyUp(list.Count - 1);
    }

    public T Dequeue()
    {
        if (list.Count == 0)
        {
            throw new InvalidOperationException();
        }

        T item = list[0];
        list[0] = list[list.Count - 1];
        list.RemoveAt(list.Count - 1);
        HeapifyDown(0);
        return item;
    }

    public T Peek()
    {
        if (list.Count == 0)
        {
            throw new InvalidOperationException();
        }

        return list[0];
    }

    public void Clear()
    {
        list.Clear();
    }

    public T[] ToArray()
    {
        return list.ToArray();
    }

    private void HeapifyUp(int idx)
    {
        while (idx > 0)
        {
            int parentIndex = (idx - 1) / 2;
            if (list[idx].CompareTo(list[parentIndex]) >= 0)
            {
                break;
            }

            T temp = list[idx];
            list[idx] = list[parentIndex];
            list[parentIndex] = temp;
            idx = parentIndex;
        }
    }

    private void HeapifyDown(int idx)
    {
        int minIdx = idx;
        int leftIdx = 2 * idx + 1;
        int rightIdx = 2 * idx + 2;

        if (leftIdx < list.Count && list[leftIdx].CompareTo(list[minIdx]) < 0)
        {
            minIdx = leftIdx;
        }

        if (rightIdx < list.Count && list[rightIdx].CompareTo(list[minIdx]) < 0)
        {
            minIdx = rightIdx;
        }

        if (idx != minIdx)
        {
            T temp = list[idx];
            list[idx] = list[minIdx];
            list[minIdx] = temp;
            HeapifyDown(minIdx);
        }
    }

    public IEnumerator<T> GetEnumerator()
    {
        return list.GetEnumerator();
    }

    IEnumerator IEnumerable.GetEnumerator()
    {
        return GetEnumerator();
    }
}
