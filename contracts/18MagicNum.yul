object "magic42" {
    code {
        //部署
        datacopy(0, dataoffset("runtime"), datasize("runtime"))
        return(0, datasize("runtime"))
    }
    object "runtime" {
        code {
            mstore(0, 0x2a)  //设置mem[0..32]=0x2a
            return(0, 0x20)  //返回mem[0..32]
        }
    }
}